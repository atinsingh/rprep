pipeline {
    agent any
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
                    agent { docker 'maven:3-alpine' }
                    steps {
                        git 'https://github.com/atinsingh/care-rest-automation.git'
                        sh 'mvn -Dtest=TCRunner test'
                    }

           }

         stages('Reports') {
            steps {
                cucumber buildStatus: "UNSTABLE",
                fileIncludePattern: "**/cucumber.json",
                jsonReportDirectory: 'target'
            }
         }
  
    }
}
