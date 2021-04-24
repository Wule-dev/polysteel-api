import { Request, Response } from "express";
import mercadopago from "mercadopago";

mercadopago.configurations.setAccessToken(process.env.ACCESS_TOKEN);

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
    console.log(
      "🚀 ~ file: PaymentController.ts ~ line 19 ~ process ~ req.body",
      req.body
    );

    const payment_data = {
      transaction_amount: 1, // CALCULAR VALOR DA COMPRA
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
        console.log(
          "🚀 ~ file: PaymentController.ts ~ line 43 ~ response",
          response
        );
        res.status(response.status).json({
          status: response.body.status,
          message: response.body.status_detail,
          id: response.body.id,
        });
      })
      .catch(function (error) {
        console.log(
          "🚀 ~ file: PaymentController.ts ~ line 51 ~ process ~ error",
          error
        );
        res.status(error.status).send(error);
      });
  },
};
