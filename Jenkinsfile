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
                sh 'echo Testing done'
            }
        }
        stage('Prepare Package') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy Server') {
            steps {
                sh 'npm run start:dev &'
            }
        }

    }
}
