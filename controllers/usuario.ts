import { Request, Response } from "express";
import Usuario from '../models/usuario';

export const getUsuarios = async (req: Request, res: Response) => {
    const usuarios = await Usuario.findAll({
        where: {
            estado: 0
        }
    });
    res.json({
        msg: 'getUsuarios',
        usuarios
    });
};

export const getUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const usuario = await Usuario.findOne({
        where: {
            id,
            estado: 0
        }
    });

    if (usuario) {
        res.json({
            msg: 'getUsuario',
            usuario
        });
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        })
    }

};

export const postUsuario = async (req: Request, res: Response) => {
    const { body } = req;
    try {

        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if (existeEmail) {
            return res.status(400).json({
                msg: `Ya existe un usuario con el email ${body.email}`
            })
        }

        const usuario = await Usuario.create(body);
        res.json({
            msg: 'postUsuario',
            usuario
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'No podemos procesar información en este momento.',
        });
    }


};

export const putUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            })
        }

        await usuario.update(body);

        res.json({
            msg: 'postUsuario',
            usuario
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'No podemos procesar información en este momento.',
        });
    }
};

export const deleteUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            })
        }

        await usuario.update({ estado: true });

        res.json({
            msg: 'deleteUsuario',
            usuario
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'No podemos procesar información en este momento.',
        });
    }
};