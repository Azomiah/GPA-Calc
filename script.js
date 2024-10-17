// GPA scale
const gradeValues = {
    "A+": 4.0, "A": 4.0, "A-": 3.7,
    "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7,
    "D+": 1.3, "D": 1.0, "D-": 0.7,
    "F": 0.0
};

document.getElementById('addRow').addEventListener('click', function() {
    const table = document.getElementById('gpaTable').getElementsByTagName('tbody')[0];
    const newRow = table.rows[0].cloneNode(true);
    newRow.querySelector('.grade').value = '';
    newRow.querySelector('.credits').value = '';
    table.appendChild(newRow);
});

document.getElementById('gpaTable').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-row')) {
        const row = event.target.closest('tr');
        row.remove();
    }
});

document.getElementById('resetGPA').addEventListener('click', function() {
    const rows = document.querySelectorAll('#gpaTable tbody tr');
    rows.forEach(row => {
        row.querySelector('.grade').value = '';
        row.querySelector('.credits').value = '';
    });
    document.getElementById('gpaResult').textContent = '';
});

document.getElementById('calculateGPA').addEventListener('click', function() {
    let totalCredits = 0;
    let totalPoints = 0;

    const rows = document.querySelectorAll('#gpaTable tbody tr');
    rows.forEach(row => {
        const isChecked = row.querySelector('.course-check').checked;
        const grade = row.querySelector('.grade').value;
        const credits = parseFloat(row.querySelector('.credits').value);

        if (isChecked && grade && !isNaN(credits)) {
            totalCredits += credits;
            totalPoints += gradeValues[grade] * credits;
        }
    });

    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 'N/A';
    document.getElementById('gpaResult').textContent = gpa;
});
