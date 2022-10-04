pipeline {
  agent any
  stages {
    stage('Checkout Code') {
      parallel {
        stage('Checkout Code') {
          steps {
            git(url: 'https://github.com/MixedMachine/GoalsWebApp', branch: 'prod')
            sh 'npm update'
          }
        }

        stage('Log') {
          steps {
            sh 'ls -la'
            sh 'npm version'
            sh 'docker version'
          }
        }

        stage('Env vars set-up') {
          steps {
            sh 'echo "LOG_LEVEL=$GWA_LOG_LEVEL" >> .env'
            sh 'echo "API_PORT=$GWA_API_PORT" >> .env'
            sh 'echo "API_HOST=$GWA_API_HOST" >> .env'
            sh 'echo "AUTH_BACKEND_URL=$GWA_AUTH_BACKEND_URL" >> .env'
            sh 'echo "GOALS_BACKEND_URL=$GWA_GOALS_BACKEND_URL" >> .env'
            sh 'echo "JWT_SECRET_KEY=$GWA_JWT_SECRET_KEY" >> .env'
            sh 'echo "" >> .env'
          }
        }
      }
    }

    stage('Unit tests') {
      steps {
        echo 'Running Unit tests...'
        sh 'make test'
      }
    }

    stage('Build images') {
      parallel {
        stage('Build images') {
          steps {
            echo 'Building docker images & pushing them to repo...'
            // sh 'make image'
          }
        }

        stage('Build resources') {
          steps {
            echo 'Building Databases & Storage resources...'
          }
        }

        stage('Log into Docker') {
          steps {
            sh 'docker login -u $DOCKER_HUB_USER -p $DOCKER_HUB_PW'
          }
        }

      }
    }

    stage('Run service') {
      steps {
        echo 'Running service with docker to run functional testing...'
      }
    }

    stage('Functional tests') {
      steps {
        echo 'Running functional tests with postman...'
      }
    }

    stage('Docker Hub push') {
      steps {
        echo 'Pushing to Dockerhub...'
        // sh 'make image-push'
      }
    }

    stage('Prod env set-up') {
      steps {
        echo 'Setting up production environment...'
      }
    }

  }
  post {
      always {
          sh 'make clean'
          sh 'rm -rf .env node_modules'
      }
      success {
          echo 'The Pipeline was successful! 🎉'
      }
      failure {
          echo'The Pipeline failed 😔'
      }
  }
}