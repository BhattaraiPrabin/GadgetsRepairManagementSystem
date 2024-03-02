const express = require("express");
const router = express.Router();
const Payment = require("../models/payment");
const Gadget = require("../models/gadget");

// Create a new payment
module.exports = {
  async newPayment(req, res) {
    try {
      const issueId = req.params.issueId;
      const gadget = Gadget.findOne({ issueId });
      const userId = gadget.user._id;

      const { amountPaid, paymentType } = req.body;

      const newPayment = new Payment({
        issueId,
        amountPaid,
        paymentType,
        userId,
      });

      const savedPayment = await newPayment.save();

      res.status(201).json(savedPayment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all payments
  async getAllPayment(req, res) {
    try {
      const payments = await Payment.find();
      res.status(200).json(payments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get payment by ID
  async getPaymentById(req, res) {
    try {
      const payment = await Payment.findById(req.params.id);
      if (!payment) {
        return res.status(404).json({ error: "Payment not found" });
      }
      res.status(200).json(payment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update payment by ID Put
  async updatePayment(req, res) {
    try {
      const updatedPayment = await Payment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedPayment) {
        return res.status(404).json({ error: "Payment not found" });
      }
      res.status(200).json(updatedPayment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete payment by ID
  async deletePayment(req, res) {
    try {
      const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
      if (!deletedPayment) {
        return res.status(404).json({ error: "Payment not found" });
      }
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
