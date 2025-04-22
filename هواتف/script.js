// إضافة موظف جديد
function addEmployee() {
  const employees = JSON.parse(localStorage.getItem('employees')) || [];
  const newEmployee = {
    name: document.getElementById('name').value,
    department: document.getElementById('department').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value
  };
  employees.push(newEmployee);
  localStorage.setItem('employees', JSON.stringify(employees));
  displayEmployees();
}

// عرض قائمة الموظفين
function displayEmployees() {
  const employees = JSON.parse(localStorage.getItem('employees')) || [];
  const list = document.getElementById('employeeList');
  list.innerHTML = '';
  employees.forEach((emp, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${emp.name} - ${emp.department} - ${emp.email} - ${emp.phone}
      <button onclick="editEmployee(${index})">تعديل</button>
      <button onclick="deleteEmployee(${index})">حذف</button>`;
    list.appendChild(li);
  });
}

// تعديل بيانات موظف
function editEmployee(index) {
  const employees = JSON.parse(localStorage.getItem('employees')) || [];
  const emp = employees[index];
  document.getElementById('name').value = emp.name;
  document.getElementById('department').value = emp.department;
  document.getElementById('email').value = emp.email;
  document.getElementById('phone').value = emp.phone;
  document.getElementById('saveButton').onclick = function() {
    saveEditedEmployee(index);
  };
}

// حفظ التعديلات
function saveEditedEmployee(index) {
  const employees = JSON.parse(localStorage.getItem('employees')) || [];
  employees[index] = {
    name: document.getElementById('name').value,
    department: document.getElementById('department').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value
  };
  localStorage.setItem('employees', JSON.stringify(employees));
  displayEmployees();
}

// حذف موظف
function deleteEmployee(index) {
  const employees = JSON.parse(localStorage.getItem('employees')) || [];
  employees.splice(index, 1);
  localStorage.setItem('employees', JSON.stringify(employees));
  displayEmployees();
}

// تصفية الموظفين بناءً على البحث
function filterEmployees() {
  const searchValue = document.getElementById('searchInput').value.toLowerCase();
  const employees = JSON.parse(localStorage.getItem('employees')) || [];
  const list = document.getElementById('employeeList');
  list.innerHTML = '';
  employees.forEach((emp, index) => {
    if (emp.name.toLowerCase().includes(searchValue) || emp.department.toLowerCase().includes(searchValue)) {
      const li = document.createElement('li');
      li.innerHTML = `${emp.name} - ${emp.department} - ${emp.email} - ${emp.phone}
        <button onclick="editEmployee(${index})">تعديل</button>
        <button onclick="deleteEmployee(${index})">حذف</button>`;
      list.appendChild(li);
    }
  });
}

// تصدير البيانات إلى PDF
function exportToPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const employees = JSON.parse(localStorage.getItem('employees')) || [];
  const columns = ["الاسم", "القسم", "البريد الإلكتروني", "رقم الهاتف"];
  const rows = employees.map(emp => [emp.name, emp.department, emp.email, emp.phone]);
  doc.autoTable({
    head: [columns],
    body: rows,
    theme: 'grid',
    styles: { fontSize: 10, cellPadding: 2 },
    margin: { top: 20 },
  });
  doc.save('employees.pdf');
}

// تصدير البيانات إلى Excel
function exportToExcel() {
  const employees = JSON.parse(localStorage.getItem('employees')) || [];
  const ws = XLSX.utils.aoa_to_sheet([
    ["الاسم", "القسم", "البريد الإلكتروني", "رقم الهاتف"],
    ...employees.map(emp => [emp.name, emp.department, emp.email, emp.phone])
  ]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "الموظفون");
  XLSX.writeFile(wb, "employees.xlsx");
}

// عرض الموظفين عند تحميل الصفحة
window.onload = displayEmployees;
