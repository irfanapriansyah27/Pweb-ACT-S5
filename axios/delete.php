<?php
include 'db.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['npm'])) {
    echo json_encode(['error' => 'Invalid input: NPM is required']);
    exit;
}

$npm = $data['npm'];

try {
    $query = $conn->prepare("DELETE FROM mahasiswa WHERE npm = :npm");
    $query->bindParam(':npm', $npm);
    $query->execute();

    echo json_encode(['message' => 'Student deleted successfully']);
} catch (Exception $e) {
    echo json_encode(['error' => 'Failed to delete student: ' . $e->getMessage()]);
}
?>
