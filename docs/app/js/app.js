import $ from 'jquery';
import Maps from './_maps';
import Forum from './_forum';
import Docs from './_docs';

$(() => {
    new Maps();
    new Forum('https://geoforum.nl', 'applicaties-en-diensten/nl-maps');
    new Docs('kadaster/nlmaps/', 'docs/README-NL.md');
});
