import { Request, Response } from "express";
import mercadopago from "mercadopago";

mercadopago.configurations.setAccessToken(
  process.env.REACT_APP_MP_ACCESS_TOKEN
);

export = {
  async process(req: Request, res: Response) {
    const {
      transactionAmount,
      token,
      description,
      installments,
      paymentMethodId,
      issuerId,
      payer,
    } = req.body;

    const payment_data = {
      transaction_amount: Number(transactionAmount),
      token: token,
      description: description,
      installments: Number(installments),
      payment_method_id: paymentMethodId,
      issuer_id: issuerId,
      payer: {
        email: payer.email,
        identification: {
          type: payer.identification.docType,
          number: payer.identification.docNumber,
        },
      },
    };

    mercadopago.payment
      .save(payment_data)
      .then(function (response) {
        res.status(response.status).json({
          status: response.body.status,
          message: response.body.status_detail,
          id: response.body.id,
        });
      })
      .catch(function (error) {
        res.status(error.status).send(error);
      });
  },
};
