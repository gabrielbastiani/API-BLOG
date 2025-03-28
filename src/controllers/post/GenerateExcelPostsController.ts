import { Request, Response } from 'express';
import { GenerateExcelPostsService } from '../../services/post/GenerateExcelPostsService'; 

class GenerateExcelPostsController {
    async handle(req: Request, res: Response) {

        const user_id = req.query.user_id as string;
        
        try {
            const generateExcelService = new GenerateExcelPostsService();
            const workbook = await generateExcelService.execute({ user_id });

            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.setHeader("Content-Disposition", "attachment; filename=modelo_de dados.xlsx");

            await workbook.xlsx.write(res);

            res.end();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao gerar o arquivo Excel." });
        }
    }
}

export { GenerateExcelPostsController };