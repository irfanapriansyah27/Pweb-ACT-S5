<?php
include 'db.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['nama']) || empty($data['kelas']) || empty($data['npm']) || empty($data['jurusan']) || empty($data['old_npm'])) {
    echo json_encode(['error' => 'Invalid input: Nama, kelas, npm, jurusan, and old_npm are required']);
    exit;
}

$nama = $data['nama'];
$kelas = $data['kelas'];
$npm = $data['npm'];
$jurusan = $data['jurusan'];
$old_npm = $data['old_npm'];

try {
    $query = $conn->prepare("UPDATE mahasiswa SET nama = :nama, kelas = :kelas, jurusan = :jurusan, npm = :npm WHERE npm = :old_npm");
    $query->bindParam(':nama', $nama);
    $query->bindParam(':kelas', $kelas);
    $query->bindParam(':npm', $npm);
    $query->bindParam(':jurusan', $jurusan);
    $query->bindParam(':old_npm', $old_npm);
    $query->execute();

    echo json_encode(['message' => 'Student updated successfully']);
} catch (Exception $e) {
    echo json_encode(['error' => 'Failed to update student: ' . $e->getMessage()]);
}
?>
