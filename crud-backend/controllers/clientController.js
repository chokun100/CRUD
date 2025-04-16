import * as clientService from "../services/clientServices.js";

export const getClients = async (req, res) => {
    try {
        const clients = await clientService.getClients();
        res.status(200).json(clients);
    } catch (err) {
        console.log("Error Fetching Clients", err);
        res.status(500).json({ message: "Error Fetching Clients" });
    }
};

export const createClients = async (req, res) => {
    try {
        const clientData = req.body;
        const newClient = await clientService.createClients(clientData);
        res.status(201).json(newClient);
    } catch (err) {
        console.log("Error Creating Client", err);
        if (err.message === "Email already exists") {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: "Error Creating Client" });
    }
};

export const updateClients = async (req, res) => {
    try {
        const clientId = req.params.id;
        const clientData = req.body;
        const updatedClient = await clientService.updateClients(clientData, clientId);
        if (!updatedClient) {
            res.status(404).json({ message: "Client not found" });
        } else {
            res.status(200).json(updatedClient);
        }

    } catch (err) {
        console.log("Error Updating Client", err);
        res.status(500).json({ message: "Error Updating Client" });

    }
};

export const deleteClient = async (req, res) => {
    try {
        const clientId = req.params.id;
        const deletedClient = await clientService.deleteClient(clientId);
        if (!deletedClient) {
            res.status(404).json({ message: "Client not found" });
        } else {
            res.status(200).send();
        }


    } catch (err) {
        console.log("Error deleting Client", err);
        res.status(500).json({ message: "Error deleting Client" });

    }
};

export const searchClients = async (req, res) => {
    try {
      const searchTerm = req.query.q; 
      const clients = await clientService.searchClients(searchTerm);
      res.status(200).json(clients);
    } catch (error) {
      console.error('Error searching clients:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

