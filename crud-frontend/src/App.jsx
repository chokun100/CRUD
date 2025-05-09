import { useState, useEffect } from 'react'
import ModalForm from './components/ModalForm'
import NavBar from './components/Navbar'
import TableList from './components/Tablelist'
import axios from 'axios';
import Swal from 'sweetalert2';

function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [searchTerm, setSearchTerm] = useState('');
    const [clientData, setClientData] = useState(null);
    const [tableData, setTableData] = useState([]);


    const fetchClients = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/clients')
            setTableData(response.data); // Set the fetched data

        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);



    const handleOpen = (mode, client) => {
        setClientData(client);
        setModalMode(mode);
        setIsOpen(true);
    };

    const handleSubmit = async (newClientData) => {
        if (modalMode === 'add') {
            try {
                const response = await axios.post('http://localhost:3000/api/clients', newClientData);
                console.log('Client added:', response.data);
                
                Swal.fire({
                    title: 'Success!',
                    text: 'Client added successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                
                fetchClients();
                
            } catch (error) {
                console.error('Error adding client:', error);
                
                const errorMessage = error.response?.data?.message || 'Error adding client';
                
                Swal.fire({
                    title: 'Error!',
                    text: errorMessage,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } else {
            console.log('Updating client with ID:', clientData.id);
            try {
                const response = await axios.put(`http://localhost:3000/api/clients/${clientData.id}`, newClientData);
                console.log('Client updated:', response.data);
                setTableData((prevData) =>
                    prevData.map((client) => (client.id === clientData.id ? response.data : client))
                );
            } catch (error) {
                console.error('Error updating client:', error);
            }

        }
    }

    <TableList
        handleOpen={handleOpen}
        tableData={tableData}
        setTableData={setTableData}
        searchTerm={searchTerm}
        fetchClients={fetchClients}
    />

    return (
        <>
            <NavBar onOpen={() => handleOpen('add')} onSearch={setSearchTerm} />
            <TableList setTableData={setTableData} tableData={tableData}
                handleOpen={handleOpen} searchTerm={searchTerm} />
            <ModalForm
                isOpen={isOpen} OnSubmit={handleSubmit}
                onClose={() => setIsOpen(false)}
                mode={modalMode} clientData={clientData}
            />
        </>
    )
}

export default App