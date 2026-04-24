Route::post('/credits/check', [CreditController::class, 'check']);
Route::post('/credits/deduct', [CreditController::class, 'deduct']);

Route::post('/payments/paymob/initiate', [PaymentController::class, 'initiatePaymob']);
Route::post('/payments/moyasar/initiate', [PaymentController::class, 'initiateMoyasar']);

Route::post('/payments/paymob/webhook', [PaymentController::class, 'handlePaymob']);
Route::post('/payments/moyasar/webhook', [PaymentController::class, 'handleMoyasar']);
