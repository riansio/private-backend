<?php
header('Content-Type: application/json');

$type = isset($_GET['REQUEST_TYPE']) ? $_GET['REQUEST_TYPE'] : '';

if ($type === 'CHECK') {
    // Loader expects success + productsOwned
    $response = [
        "success" => true,
        "productsOwned" => [
            "monospace0" => true,
            "polaris0"   => true
        ]
    ];
    echo json_encode($response);
    exit;
}

if ($type === 'CHECK_BLACKLIST') {
    // Loader expects enabled/reason/level
    $response = [
        "enabled" => false,
        "reason"  => "None",
        "level"   => 0
    ];
    echo json_encode($response);
    exit;
}

// Default fallback
echo json_encode(["error" => "Invalid request"]);
?>
