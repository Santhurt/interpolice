import Ciudadano from "../ciudadano/ciudadano.model.js";

export async function subirImagen(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No se subio ningun archivo",
            });
        }

        const id = req.params.id;
        const imageUrl = `${"http://localhost:3000"}/uploads/ciudadanos/${req.file.filename}`;

        const filas = await Ciudadano.update(
            { foto: imageUrl },
            {
                where: {
                    id_ciudadano: id,
                },
            },
        );

        if (filas > 0) {
            return res.status(200).json({
                success: true,
                file: {
                    filename: req.file.filename,
                    originalname: req.file.originalname,
                    size: req.file.size,
                    url: imageUrl,
                },
            });
        } else {
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
