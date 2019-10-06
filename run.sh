if [ -z $1 ]; then
    echo "OnDemand account is needed."
    exit 1
fi

ODR_USER=$1
ODR_PWD=$(
    security find-generic-password -a $ODR_USER -s ondemand -w)

export ODR_USER
export ODR_PWD

./node_modules/.bin/gauge run specs/

