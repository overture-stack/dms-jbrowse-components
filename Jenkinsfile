String podSpec = '''
apiVersion: v1
kind: Pod
spec:
  containers:
    - name: node
      image: node:18
      tty: true
      env:
        - name: HOME
          value: /home/jenkins/agent
      resources:
        requests:
          memory: 768Mi
          cpu: 1000m
        limits:
          memory: 2560Mi
          cpu: 4000m
  securityContext:
    runAsUser: 1000
'''

pipeline {
    agent {
        kubernetes {
            yaml podSpec
        }
    }

    environment {
        appName = 'dms-jbrowse-components'
        gitHubRegistry = 'ghcr.io'
        gitHubRepo = "overture-stack/${appName}"

        commit = sh(
            returnStdout: true,
            script: 'git describe --always'
        ).trim()

        version = sh(
            returnStdout: true,
            script:
                'cat package.json | ' +
                'grep "version" -m 1 | ' +
                'cut -d : -f2 | ' +
                "sed \'s:[\",]::g\'"
        ).trim()

        slackNotificationsUrl = credentials('OvertureSlackJenkinsWebhookURL')
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
    }

    stages {
        stage('Build modules') {
            steps {
                container('node') {
                    sh 'npm ci'
                    sh 'npm run build'
                }
            }
        }

        stage('Tag git version') {
            when {
                branch 'main'
            }
            steps {
                container('node') {
                    withCredentials([usernamePassword(
                        credentialsId: 'OvertureBioGithub',
                        passwordVariable: 'GIT_PASSWORD',
                        usernameVariable: 'GIT_USERNAME'
                    )]) {
                        sh "git tag v${version}"
                        sh "git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/${gitHubRepo} --tags"
                    }
                }
            }
        }

        stage('Publish tag to npm') {
            when {
                branch 'main'
            }
            steps {
                container('node') {
                    withCredentials([
                        string(
                            credentialsId: 'OvertureNPMAutomationToken',
                            variable: 'NPM_TOKEN'
                        )
                    ]) {
                        script {
                            // we still want to run the deploy even if this fails, hence try-catch
                            try {
                                sh 'git reset --hard HEAD'
                                sh 'git pull --tags'
                                sh 'npm run build'
                                sh "npm config set '//registry.npmjs.org/:_authToken' \"${NPM_TOKEN}\""
                                sh 'npm publish --access public'
                                // send a notification to the slack #overture-jenkins channel in OICR workspace
                                sh "curl \
                                    -X POST \
                                    -H 'Content-type: application/json' \
                                        --data '{ \
                                            \"text\":\"New DMS JBrowse Components published succesfully: v.${version}\
                                            \n[Build ${env.BUILD_NUMBER}] (${env.BUILD_URL})\" \
                                        }' \
                                    ${slackNotificationsUrl}"
                            } catch (err) {
                                echo 'There was an error while publishing packages'
                            }
                        }
                    }
                }
            }
        }
    }

    post {
        failure {
            container('node') {
                script {
                    if (env.BRANCH_NAME ==~ /(develop|main|\S*[Tt]est\S*)/) {
                        sh "curl \
                            -X POST \
                            -H 'Content-type: application/json' \
                            --data '{ \
                                \"text\":\"Build Failed: ${env.JOB_NAME}#${commit} \
                                \n[Build ${env.BUILD_NUMBER}] (${env.BUILD_URL})\" \
                            }' \
                            ${slackNotificationsUrl}"
                    }
                }
            }
        }

        fixed {
            container('node') {
                script {
                    if (env.BRANCH_NAME ==~ /(develop|main|\S*[Tt]est\S*)/) {
                        sh "curl \
                            -X POST \
                            -H 'Content-type: application/json' \
                            --data '{ \
                                \"text\":\"Build Fixed: ${env.JOB_NAME}#${commit} \
                                \n[Build ${env.BUILD_NUMBER}] (${env.BUILD_URL})\" \
                            }' \
                            ${slackNotificationsUrl}"
                    }
                }
            }
        }

        success {
            container('node') {
                script {
                    if (env.BRANCH_NAME ==~ /(\S*[Tt]est\S*)/) {
                        sh "curl \
                            -X POST \
                            -H 'Content-type: application/json' \
                            --data '{ \
                                \"text\":\"Build tested: ${env.JOB_NAME}#${commit} \
                                \n[Build ${env.BUILD_NUMBER}] (${env.BUILD_URL})\" \
                            }' \
                            ${slackNotificationsUrl}"
                    }
                }
            }
        }
    }
}
