const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const ong_id = request.headers.authorization;
        const { page = 1 } = request.query;

        const [total] = await connection('incidents').count();

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .where('ong_id', ong_id)
        .limit(5)
        .offset((page - 1) * 5)
        .select('incidents.*',
         'ongs.name', 
         'ongs.email', 
         'ongs.whatsapp', 
         'ongs.city', 
         'ongs.uf');

        response.header('X-Total-Count', total['count(*)']);
        return response.json({ incidents });
    }
}