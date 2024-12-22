import Tickets from "../models/ticket.js";

export const listTickets = async () => {
  try {
    const tickets = await Tickets.findAll();
    return {
      errCode: 0,
      message: "Tickets fetched successfully.",
      data: tickets,
    };
  } catch (error) {
    console.error("Error fetching tickets:", error.message);
    return {
      errCode: 1,
      message: "Unable to fetch tickets.",
    };
  }
};

export const getTicketById = async (ticketId) => {
  try {
    const ticket = await Tickets.findByPk(ticketId);
    if (!ticket) {
      return {
        errCode: 2,
        message: "Ticket not found with the given ID.",
      };
    }
    return {
      errCode: 0,
      message: "Ticket fetched successfully.",
      data: ticket,
    };
  } catch (error) {
    console.error("Error fetching ticket by ID:", error.message);
    return {
      errCode: 1,
      message: "Unable to fetch ticket.",
    };
  }
};

export const createTicket = async (ticketData) => {
  try {
    const newTicket = await Tickets.create(ticketData);
    return {
      errCode: 0,
      message: "Ticket created successfully.",
      data: newTicket,
    };
  } catch (error) {
    console.error("Error creating ticket:", error.message);
    return {
      errCode: 1,
      message: "Unable to create ticket.",
    };
  }
};

export const updateTicket = async (ticketId, ticketData) => {
  try {
    const [updatedRowsCount] = await Tickets.update(ticketData, {
      where: { ticket_id: ticketId },
    });
    if (updatedRowsCount === 0) {
      return {
        errCode: 2,
        message: "Ticket not found with the given ID for updating.",
      };
    }
    return {
      errCode: 0,
      message: "Ticket updated successfully.",
    };
  } catch (error) {
    console.error("Error updating ticket:", error.message);
    return {
      errCode: 1,
      message: "Unable to update ticket.",
    };
  }
};

export const deleteTicket = async (ticketId) => {
  try {
    const deletedRowsCount = await Tickets.destroy({
      where: { ticket_id: ticketId },
    });
    if (deletedRowsCount === 0) {
      return {
        errCode: 2,
        message: "Ticket not found with the given ID for deletion.",
      };
    }
    return {
      errCode: 0,
      message: "Ticket deleted successfully.",
    };
  } catch (error) {
    console.error("Error deleting ticket:", error.message);
    return {
      errCode: 1,
      message: "Unable to delete ticket.",
    };
  }
};