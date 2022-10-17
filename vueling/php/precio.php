<?php

$duracion_precio=[
    "67,55","88,75","57,40","63,50","52,35","66,60",
];

$posicion = file_get_contents('php://input');

$posicion = json_decode($posicion);

echo json_encode($duracion_precio[$posicion]);

// $info = array(
//     "barcelona-madrid" => [67, 55],
// );