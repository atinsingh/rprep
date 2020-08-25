pipeline {
    agent any
    tools {nodejs "nodejs"}
    stages {
        stage('Checkout') {
            steps {
                sh 'echo Hello World'
                sh 'echo define '
            }
        }
        stage('Compile') {
            steps {
                sh 'npm install'
            }
        }
        stage('Unit testing') {
            steps {
             sh 'npm run test'
            }
        }
        stage('Prepare Package') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy Server') {
            steps {
                sh 'npm run dev &'
            }
        }

        stage('API Functional Test'){

                    steps {
                        git 'https://github.com/atinsingh/care-rest-automation.git'
                        sh 'cd care-rest-automation'
                        withMaven(jdk: 'jdk8', maven: 'm3.6') {
                            sh 'mvn -Dtest=TCRunner test'
                        }
                    }
           }

         stage('Reports') {
            steps {
                cucumber buildStatus: "UNSTABLE",
                fileIncludePattern: "**/cucumber.json",
                jsonReportDirectory: 'target'
            }
         }

    }
}
