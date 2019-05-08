#!/bin/bash

# 如果异常错误（比如内存不足）npd
set -o errexit

echo "start"

install_nvm(){
  if [ -z $NVM_DIR ]
  then
    export NVM_DIR="$HOME/.nvm"
  else
    export NVM_DIR
  fi

  echo $NVM_DIR
  echo "$(ls -a $NVM_DIR)"
  if [ -s "$NVM_DIR/nvm.sh" ]
  then
    . "$NVM_DIR/nvm.sh"
  else
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
    . "$NVM_DIR/nvm.sh"
  fi
}

install_nvm
echo "install_nvm completed"
nvm install 10.15.3
nvm use 10.15.3
npm config set strict-ssl false
npm config set registry "https://registry.npm.taobao.org"
npm install --production
npm run online
echo "release completed"
