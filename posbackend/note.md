# transactions table foregn key solve

ALTER TABLE bank_transactions
DROP FOREIGN KEY bank_transactions_account_id_foreign;

ALTER TABLE bank_transactions
ADD CONSTRAINT bank_transactions_account_id_foreign
FOREIGN KEY (account_id)
REFERENCES bank_accounts (id);
