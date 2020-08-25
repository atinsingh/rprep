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
                sh 'npm run build'
            }

        }
    }
}
