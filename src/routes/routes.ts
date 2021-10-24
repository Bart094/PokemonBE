import express from 'express';
import pokemonService from '../services/pokemon.service';
const router = express.Router();

//EndPoint 1 - Basic Pokemon Informations
router.get('/pokemon/:pokemonName', pokemonService.getBasicInfo);

//EndPoint 2 - Basic Pokemon Informations With Translated Description
router.get('/pokemon/translated/:pokemonName', pokemonService.getTranslatedDescription)

export = router;