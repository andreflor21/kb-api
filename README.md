# Kanban API

- Gerar container do Docker com o db mySQL

```shell
docker run --name kanban --env=MYSQL_ROOT_PASSWORD=kanban -p 3306:3306 -p 33060:33060 -d mysql:latest
```

- Gerar JWT secret token

```javaScript
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
