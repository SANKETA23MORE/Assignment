document.addEventListener('DOMContentLoaded', function () {
    // Elements
    const form = document.getElementById('studentForm');
    const studentTable = document.querySelector('#studentTable tbody');

    // Load existing records from localStorage
    loadStudents();

    // Handle form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const studentName = document.getElementById('studentName').value;
        const studentID = document.getElementById('studentID').value;
        const email = document.getElementById('email').value;
        const contact = document.getElementById('contact').value;

        // Input validation: ensure no field is empty
        if (studentName === '' || studentID === '' || email === '' || contact === '') {
            alert("Please fill all the fields.");
            return;
        }

        // Add student record
        const studentData = {
            studentName,
            studentID,
            email,
            contact
        };

        // Save to localStorage
        let students = JSON.parse(localStorage.getItem('students')) || [];
        students.push(studentData);
        localStorage.setItem('students', JSON.stringify(students));

        // Add to display
        addStudentToTable(studentData);
        form.reset();  // Reset form after submission
    });

    function loadStudents() {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        students.forEach(addStudentToTable);
    }

    function addStudentToTable(studentData) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${studentData.studentName}</td>
            <td>${studentData.studentID}</td>
            <td>${studentData.email}</td>
            <td>${studentData.contact}</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;
        studentTable.appendChild(row);

        // Handle edit and delete actions
        row.querySelector('.edit-btn').addEventListener('click', () => editStudent(row, studentData));
        row.querySelector('.delete-btn').addEventListener('click', () => deleteStudent(row, studentData));
    }

    function editStudent(row, studentData) {
        // Fill form with current data for editing
        document.getElementById('studentName').value = studentData.studentName;
        document.getElementById('studentID').value = studentData.studentID;
        document.getElementById('email').value = studentData.email;
        document.getElementById('contact').value = studentData.contact;

        // Remove old record after editing
        deleteStudent(row, studentData);
    }

    function deleteStudent(row, studentData) {
        // Remove from localStorage
        let students = JSON.parse(localStorage.getItem('students')) || [];
        students = students.filter(student => student.studentID !== studentData.studentID);
        localStorage.setItem('students', JSON.stringify(students));

        // Remove from UI
        row.remove();
    }
});
