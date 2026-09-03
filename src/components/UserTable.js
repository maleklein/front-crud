import React from 'react';

const UserTable = ({ users, editRow, deleteUser, showActions }) => {
  return (
    <table className="table table-hover mb-0">
      <thead className="table-light">
        <tr>
          <th>Nombre</th>
          <th>Usuario</th>
          {/* Solo mostramos el encabezado "Acciones" si showActions es true */}
          {showActions && <th className="text-end">Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              
              {/* Celdas de botones condicionales */}
              {showActions && (
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#userModal"
                    onClick={() => editRow(user)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteUser(user.id)}
                  >
                    Eliminar
                  </button>
                </td>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={showActions ? 3 : 2} className="text-center">
              No hay usuarios registrados
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserTable;