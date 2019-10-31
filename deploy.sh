docker build -t egbodofo/ecodock-client:latest -t egbodofo/ecodock-client:$SHA -f ./client/Dockerfile ./client
docker build -t egbodofo/ecodock-server:latest -t egbodofo/ecodock-server:$SHA -f ./server/Dockerfile ./server

docker push egbodofo/ecodock-client:latest
docker push egbodofo/ecodock-server:latest

docker push egbodofo/ecodock-client:$SHA
docker push egbodofo/ecodock-server:$SHA

kubectl apply -f k8s

kubectl set image deployments/server-deployment server=egbodofo/ecodock-server:$SHA
kubectl set image deployments/client-deployment client=egbodofo/ecodock-client:$SHA


# Other Userful Commands
# docker run -it -v "$(pwd)":/usr/src/app ruby:2.3 bash
# gem install travis --no-rdoc --no-ri
# travis login
# travis encrypt-file service-account.json -r egbodofo/multi-docker-k8s
# kubectl set image deployment/client-deployment client=egbodofo/multi-docker-client
# kubectl create secret generic pgpassword --from-literal PGPASSWORD=postgres_password
# kubectl create serviceaccount --namespace kube-system tiller
# kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
# helm init --service-account tiller --upgrade
