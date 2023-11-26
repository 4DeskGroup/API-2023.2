export async function SETParceiroEstoque(client, parceiroEstoque) {
    // await client.connect();

    try {

        let isSucesso = false

        const checkQuery = "SELECT ParceiroEstoqueID FROM ParceiroEstoque WHERE ParceiroID = $1 AND ParceiroEstoqueTipo = $2"

        const checkValues = [parceiroEstoque.ParceiroID, parceiroEstoque.ParceiroEstoqueTipo]
        const checkResult = await client.query(checkQuery, checkValues);

        if (checkResult.rows.length > 0) {
            const updateSQL = `
                UPDATE ParceiroEstoque
                SET ParceiroEstoqueProdutoQuantidade = ParceiroEstoqueProdutoQuantidade + $1
                WHERE ParceiroID = $2
                AND ParceiroEstoqueTipo = $3
            `;

            const updateValues = [parceiroEstoque.ParceiroEstoqueProdutoQuantidade, parceiroEstoque.ParceiroID, parceiroEstoque.ParceiroEstoqueTipo]

            const retornoUpdate = await client.query(updateSQL, updateValues)
            console.log('Estoque de parceiro atualizado com sucesso.');
            isSucesso = true;

            return { isSucesso };
        } else {
            const query = `
            INSERT INTO ParceiroEstoque (ParceiroID, ParceiroEstoqueProdutoDescricao, ParceiroEstoqueTipo, ParceiroEstoqueProdutoQuantidade) VALUES ($1, $2, $3, $4) RETURNING ParceiroEstoqueID;`;

            const values = [
                parceiroEstoque.ParceiroID,
                parceiroEstoque.ParceiroEstoqueProdutoDescricao,
                parceiroEstoque.ParceiroEstoqueTipo,
                parceiroEstoque.ParceiroEstoqueProdutoQuantidade
            ];

            const result = await client.query(query, values);

            if (result) {
                console.log(`Estoque de parceiro inserido com sucesso. ID: ${result.rows[0].parceiroestoqueid}`);
                // const id = result.rows[0].parceiroestoqueid
                isSucesso = true

                return { isSucesso };
            }
        }
    } catch (error) {
        console.error('Erro ao inserir ou atualizar estoque de parceiro:', error);
        throw error;
    }
}