const csv = require( 'csv-parser' )
const fs = require( 'fs' )
const express = require( 'express' );
const path = require( 'path' );
const logger = require( 'morgan' );
const cookieParser = require( 'cookie-parser' );
const bodyParser = require( 'body-parser' );
const fileUpload = require( 'express-fileupload' );
const cors = require( 'cors' );

const app = express();

app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'jade' );


app.use( logger( 'dev' ) );
app.use( cors() );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( cookieParser() );
app.use( fileUpload() );
app.use( '/data', express.static( __dirname + '/data' ) );

function csvToJson( filename ) {
  let results = [];
  fs.createReadStream( `./data/${ filename }` )
    .pipe( csv() )
    .on( 'data', ( data ) => results.push( data ) )
    .on( 'end', () => {
      let filenameJSON = `${ filename }`.slice( 0, -4 );
      const data = JSON.stringify( results );
      fs.writeFileSync( `./json/${ filenameJSON }.json`, data );
    } );
}


function parceData() {
  let files = [];

  fs.readdirSync( "./data/" ).forEach( file => {
    files.push( file );
  } );

  files.map( ( file ) => (
    csvToJson( file )
  ) );
}





function parceJson( spec ) {
  let specPlan = [];
  const getPlan = ( data, filename ) => {
    let curriculum = { course: filename.slice( 4, 5 ), plan: data };
    specPlan.push( curriculum );
  }



  fs.readdirSync( "./json/" ).forEach( file => {
    if ( file.slice( 0, 3 ) === spec ) {
      let data = JSON.parse( fs.readFileSync( `./json/${ file }`, "utf8" ) );
      getPlan( data, file );
    }
  } );

  return specPlan;
}

app.get( "/122", ( req, res ) => {
  res.send( parceJson( "122" ) );
} );

app.get( "/152", ( req, res ) => {
  res.send( parceJson( "152" ) );
} );

app.get( "/163", ( req, res ) => {
  res.send( parceJson( "163" ) );
} );

app.get( "/227", ( req, res ) => {
  res.send( parceJson( "227" ) );
} );

app.post( '/upload', ( req, res, next ) => {
  let file = req.files.file;

  file.mv( `${ __dirname }/data/${ req.files.file.name }`, function ( err ) {
    if ( err ) {
      return res.status( 500 ).send( err );
    }
    if ( req.files.file.name.slice( 0, -4 ).length !== 5 ) {
      fs.unlinkSync( `./data/${ req.files.file.name }` );
      return res.status( 406 ).send( err );
    }
    if ( req.files.file.name.substr( req.files.file.name.length - 3 ) !== "csv" ) {
      fs.unlinkSync( `./data/${ req.files.file.name }` );
      return res.status( 415 ).send( err );
    }
    res.json( { file: `data/${ req.files.file.name }` } );

    parceData();
  } );

} )


app.use( function ( req, res, next ) {
  const err = new Error( 'Not Found' );
  err.status = 404;
  next( err );
} );

app.use( function ( err, req, res, next ) {
  res.locals.message = err.message;
  res.locals.error = req.app.get( 'env' ) === 'development' ? err : {};

  res.status( err.status || 500 );
  res.render( 'error' );
} );

app.listen( 8000, () => {
  console.log( '8000' );
} );

module.exports = app;


