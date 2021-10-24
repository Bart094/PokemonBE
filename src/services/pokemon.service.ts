import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { Message } from '../interfaces/message';
import { Pokemon } from '../interfaces/pokemon';
import { TranslationResponse } from '../interfaces/translationResponse';

//POST Yoda Translation
async function postYodaTranslation(text: string) {
  let body = {
    text
  }
  try {
    let response: AxiosResponse<TranslationResponse> = await axios.post('https://api.funtranslations.com/translate/yoda', body);
    return response.data.contents.translated;
  }
  catch {
    return text;
  }
}

//POST Shakespeare Translation
async function postShakespeareTranslation(text: string) {
  let body = {
    text
  }
  try {
    let response: AxiosResponse<TranslationResponse> = await axios.post('https://api.funtranslations.com/translate/shakespeare', body);
    return response.data.contents.translated;
  }
  catch {
    return text;
  }
}

//EndPoint 1 - GET Basic Pokemon Informations
const getBasicInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let result: AxiosResponse<Message> = await axios.get('https://pokeapi.co/api/v2/pokemon-species/' + req.params.pokemonName);

    let response: Pokemon = {
      name: result.data.name,
      description: result.data.flavor_text_entries[0].flavor_text.replace(/[\u0000-\u001F\u007F-\u009F]/g, " "),
      habitat: result.data.habitat.name,
      is_legendary: result.data.is_legendary
    }

    return res.status(200).json(
      response
    );
  } catch (err) {
    console.error(err);
    return res.status(err.response.status).json(
      err
    );
  }
};

//EndPoint 2 - GET Basic Pokemon Informations With Translated Description
const getTranslatedDescription = async (req: Request, res: Response, next: NextFunction) => {

  var translation = '';
  var result: AxiosResponse<Message>;

  try {
    result = await axios.get('https://pokeapi.co/api/v2/pokemon-species/' + req.params.pokemonName);
    if (result.data.habitat.name == 'cave' || result.data.is_legendary) {
      translation = await postYodaTranslation(result.data.flavor_text_entries[0].flavor_text);
    }
    else {
      translation = await postShakespeareTranslation(result.data.flavor_text_entries[0].flavor_text);
    }

    let response: Pokemon = {
      name: result.data.name,
      description: translation.replace(/[\u0000-\u001F\u007F-\u009F]/g, " "),
      habitat: result.data.habitat.name,
      is_legendary: result.data.is_legendary
    }

    return res.status(200).json(
      response
    );
  } catch (err) {
    console.error(err);
    return res.status(err.response.status).json(
      err
    );
  }
}

export default { getBasicInfo, getTranslatedDescription };



