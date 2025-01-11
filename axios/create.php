<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Include koneksi database
include_once 'db.php';

try {
    // Ambil data JSON dari request body
    $data = json_decode(file_get_contents("php://input"), true);

    // Validasi input
    if (!isset($data['npm'], $data['nama'], $data['kelas'], $data['jurusan']) ||
        empty($data['npm']) || empty($data['nama']) || empty($data['kelas']) || empty($data['jurusan'])) {
        echo json_encode(["success" => false, "message" => "Semua field (npm, nama, kelas, jurusan) harus diisi"]);
        exit;
    }

    // Ambil dan sanitasi data
    $npm = htmlspecialchars($data['npm']);
    $nama = htmlspecialchars($data['nama']);
    $kelas = htmlspecialchars($data['kelas']);
    $jurusan = htmlspecialchars($data['jurusan']);

    // Query untuk menambahkan data ke tabel mahasiswa
    $sql = "INSERT INTO mahasiswa (npm, nama, kelas, jurusan) VALUES (:npm, :nama, :kelas, :jurusan)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':npm', $npm);
    $stmt->bindParam(':nama', $nama);
    $stmt->bindParam(':kelas', $kelas);
    $stmt->bindParam(':jurusan', $jurusan);

    // Eksekusi query
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Data berhasil ditambahkan"]);
    } else {
        echo json_encode(["success" => false, "message" => "Gagal menambahkan data"]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "General error: " . $e->getMessage()]);
}
