import { connect, Schema, model } from 'mongoose'; 
connect('mongodb+srv://Grupo-17:grupo17@cursadanodejs.ls9ii.mongodb.net/Node-js', /*{useNewUrlParser: true, useUnifiedTopology: true}*/) 
    .then(() => console.log('Conexión exitosa a MongoDB')) 
    .catch(error => console.error('Error al conectar a MongoDB:', error));

    const superheroSchema = new Schema({ 
        nombreSuperHeroe: { type: String, required: true }, 
        nombreReal: { type: String, required: true }, 
        edad: { type: Number, min: 0 }, 
        planetaOrigen: {type: String, default: 'Desconocido' }, 
        debilidad: String, 
        poderes: [String], 
        aliados: [String], 
        enemigos: [String], 
        createdAt: { type: Date, default: Date.now },
        creador: { type: String, default: 'Gonzalo Gabriel Soria' }
        }, { collection: 'Grupo-17' });

    const SuperHero = model ('SuperHero', superheroSchema); 

    async function insertSuperHero() { 
        const hero = new SuperHero({ 
            nombreSuperHeroe: 'Spiderman', 
            nombreReal: 'Peter Parker', 
            edad: 25, 
            planetaOrigen: 'Tierra', 
            debilidad: 'Radioactiva', 
            poderes: ['Trepar paredes', 'Sentido arácnido', 'Super fuerza', 'Agilidad'], 
            aliados: ['Ironman'], 
            enemigos: ['Duende Verde'] 
        }); 

        try {
            await hero.save(); 
            console.log('Superhéroe insertado:', hero); 
        } catch (error) {
            console.error('Error al insertar el superhéroe:', error);
        }
    } 

    async function updateSuperHero (nombreSuperHeroe) { 
        const result = await SuperHero.updateOne( 
            { nombreSuperHeroe: nombreSuperHeroe }, 
            { $set: {edad: 26 } } 
        ); 
        console.log('Resultado de la actualización:', result);
    }

    async function deleteSuperHero (nombreSuperHeroe) { 
        const result = await SuperHero.deleteOne({ nombreSuperHeroe: nombreSuperHeroe }); 
        console.log('Superhéroe eliminado:', result); 
    } 
    
    async function findSuperHeroes() { 
        const heroes = await SuperHero.find({ planetaOrigen: 'Tierra' }); 
        console.log('Superhéroes encontrados:', heroes); 
    } 

    //Descomentar los metodos que se deseen utlizar
    //await insertSuperHero();
    //await updateSuperHero ('Spiderman');
    //await deleteSuperHero ('Spiderman');
    //await findSuperHeroes(); 