import { Request, Response } from 'express';
import { BulkDeleteUsersBlogService } from '../../../services/user/user_blog/BulkDeleteUsersBlogService'; 
import multer from 'multer';

const upload = multer({ dest: 'temp_file/' }); // Diretório temporário para arquivos

class BulkDeleteUsersBlogController {
    async handle(req: Request, res: Response) {
        const user_id = req.query.user_id as string;
        const { file } = req;

        if (!file) {
            return res.status(400).json({ error: "Arquivo Excel não fornecido" });
        }

        const service = new BulkDeleteUsersBlogService();

        try {
            const result = await service.execute(file.path, user_id);
            return res.status(200).json({ message: "Usuários deletados com sucesso", result });
        } catch (error) {/* @ts-ignore */
            return res.status(500).json({ error: "Erro ao deletar usuários", details: error.message });
        }
    }
}

export { BulkDeleteUsersBlogController, upload };
