// Static imports of all locale data — Vite bundles each as a separate chunk,
// so only the needed locale is loaded at runtime. Both PT and EN are small
// JSON files so the overhead is negligible.
import ptDescobrir from './pt/descobrir.json';
import enDescobrir from './en/descobrir.json';
import ptAtividades from './pt/atividades.json';
import enAtividades from './en/atividades.json';
import ptSuiteAlentejana from './pt/suiteAlentejana.json';
import enSuiteAlentejana from './en/suiteAlentejana.json';
import ptGaleria from './pt/galeria.json';
import enGaleria from './en/galeria.json';
import ptHome from './pt/home.json';
import enHome from './en/home.json';
import ptQuartos from './pt/quartos.json';
import enQuartos from './en/quartos.json';
import ptLocalizacao from './pt/localizacao.json';
import enLocalizacao from './en/localizacao.json';

const DATA = {
  pt: {
    descobrir: ptDescobrir,
    atividades: ptAtividades,
    suiteAlentejana: ptSuiteAlentejana,
    galeria: ptGaleria,
    home: ptHome,
    quartos: ptQuartos,
    localizacao: ptLocalizacao,
  },
  en: {
    descobrir: enDescobrir,
    atividades: enAtividades,
    suiteAlentejana: enSuiteAlentejana,
    galeria: enGaleria,
    home: enHome,
    quartos: enQuartos,
    localizacao: enLocalizacao,
  },
};

/**
 * Get locale-specific data for a given module.
 * @param {string} moduleName - 'descobrir' | 'atividades' | 'suiteAlentejana' | 'galeria' | 'home' | 'quartos' | 'localizacao'
 * @param {string} locale - 'pt' | 'en'
 */
export function getData(moduleName, locale) {
  return DATA[locale]?.[moduleName] ?? DATA.pt[moduleName] ?? null;
}

export default DATA;
