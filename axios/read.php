<?php
include 'db.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

try {
    $query = $conn->prepare("SELECT nama, kelas, npm, jurusan FROM mahasiswa");
    $query->execute();

    $result = $query->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($result);
} catch (Exception $e) {
    echo json_encode(['error' => 'Failed to fetch data: ' . $e->getMessage()]);
}
?>
