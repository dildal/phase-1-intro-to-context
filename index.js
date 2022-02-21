// Your code here
function createEmployeeRecord(employeeArr){
    return {
        firstName: employeeArr[0],
        familyName: employeeArr[1],
        title: employeeArr[2],
        payPerHour: employeeArr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrayOfEmployees){
    return arrayOfEmployees.map(employeeArr => createEmployeeRecord(employeeArr));
}

function createTimeInEvent(employee, dateStamp){
    employee.timeInEvents.push({
        type: 'TimeIn',
        hour: +dateStamp.split(' ')[1],
        date: dateStamp.split(' ')[0],
    });
    return employee; 
}

function createTimeOutEvent(employee, dateStamp){
    employee.timeOutEvents.push({
        type: 'TimeOut',
        hour: +dateStamp.split(' ')[1],
        date: dateStamp.split(' ')[0],
    });
    return employee;  
}

function hoursWorkedOnDate(employee, date){
    const timeIn = employee.timeInEvents.find(timeIn => {
        return timeIn.date === date;
    });
    const timeOut = employee.timeOutEvents.find(timeOut => {
        return timeOut.date === date;
    });
    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date){
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee){
   return  employee.timeInEvents.reduce((acc, timeIn) => {
        return acc += wagesEarnedOnDate(employee, timeIn.date);
    }, 0)
}

function calculatePayroll(arrayOfEmployees){
    return arrayOfEmployees.reduce((acc, employee) => acc += allWagesFor(employee), 0)
}