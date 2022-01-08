<?php
$_POST = json_decode(file_get_contents("php//input"), true) // обычно json данные получают через node.js а не php но с помощью этой команды можно получить json данные через пхп
echo var_dump($_POST); //берет те данные которые пришли, переводит их в строку и показывает обратно на клиенте