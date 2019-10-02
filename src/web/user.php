<?php
// /src/web/user.php
$array = [
    'result' => 'OK',
    'data' => [
        'name' => '柳澤宏樹',
        'enname' => 'Hiroki Yanagisawa',
        'birthday' => '1982.09.20',
        'constellation' => '乙女座'
    ]
];
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo json_encode($array);
// {
//     "result": "OK",
//     "data": {
//         "name": "柳澤宏樹",
//         "en-name": "Hiroki Yanagisawa",
//         "birthday": "1982.09.20",
//         "constellation": "乙女座"
//     }
// }