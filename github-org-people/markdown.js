import fs from 'fs';

function mergeAndConvertToMarkdown(users, employees) {
  const mergedData = users.map(user => {
    const employee = employees.find(emp => emp.login === user.login);
    return { ...user, ...employee };
  });

  const headers = ['login', 'name', 'url', 'role', 'emp_name', 'dept'];
  
  let markdownTable = '| ' + headers.join(' | ') + ' |\n';
  markdownTable += '| ' + headers.map(() => '---').join(' | ') + ' |\n';

  mergedData.forEach(row => {
    markdownTable += '| ' + headers.map(header => row[header] || '').join(' | ') + ' |\n';
  });

  return markdownTable;
}

try {
  const usersData = fs.readFileSync('members.json', 'utf8');
  const users = JSON.parse(usersData);
  const employeesData = fs.readFileSync('emp.json', 'utf8');
  const employees = JSON.parse(employeesData);

  const markdownTable = mergeAndConvertToMarkdown(users, employees);
  console.log(markdownTable);
} catch (error) {
  console.error('Error processing files:', error);
}

