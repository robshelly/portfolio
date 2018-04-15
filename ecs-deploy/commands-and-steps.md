```bash
############################################################
#
# List of AWS CLI commands used to createa infrastructure
#
#
############################################################

######### AWS Container Exercise ##########


# Create a cluster, no instance created, just an mpty named cluster
aws ecs create-cluster --cluster-name portfolio

# Launch ECS Optimized instance
aws ec2 run-instances --image-id ami-2d386654 --count 1 --instance-type t2.micro --key-name ${key-name} --security-groups ${sec-group-name} --iam-instance-profile Name=ecsInstanceRole --user-data file://ecs-deploy/user-data.txt --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=portfolio}]'

# Create task definition
aws ecs register-task-definition --cli-input-json file://simple-app-task-def.json

# Run the task
aws ecs run-task --cluster $CLUSTER_NAME --task-definition $TASK_DEF:$REVISION --count 1

aws ecs run-task --cluster portfolio --task-definition portfolio:1 --count 1

## Important 
## Visit IP no dns

###### SUCCESS ######