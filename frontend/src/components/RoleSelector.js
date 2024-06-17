import React from 'react';

const RoleSelector = ({ role, setRole }) => {
  return (
    <div className="form-group d-flex justify-content-center align-items-center">
      <label htmlFor="roleSelector" className="mr-2 mb-0">Выберите роль:</label>
      <select
        id="roleSelector"
        className="form-control w-auto"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="Студент">Студент</option>
        <option value="Преподаватель">Преподаватель</option>
        <option value="Администратор">Администратор</option>
      </select>
    </div>
  );
};

export default RoleSelector;
