# Your snippets
#
#
#
# "snip" and then hitting
# tab.
#
# An example CoffeeScript snippet to expand log to console.log:
#
#  !!!! Ben, c est du CoffeeScript, faut que tu fasses attention a l indent.
#
# 1-the language identifier, or scope string
# 2-a name which concisely describes the code
# 3-the trigger text which fires the snippet once Tab is hit, and
# 4-the snippet body code with optional tab stops.
# Each scope (e.g. '.source.coffee' above) can only be declared once.
# Voici la forme :
#'.source.js':
#  'console':
#    'prefix': '!!'
#    'body': 'console.log()'
#  pour faire un multi-ligne faut mettre 3 """ au debut du body et a la fin
#  HTML: .text.html.basic
#  CSS: .source.css
#  SASS: .source.sass
#  JavaScript: .source.js
#  JSON: .source.json
#  PHP: .text.html.php
#  Java: .source.java
#  Ruby: .text.html.erb
#  Python: .source.python
#  plain text (including markdown): .text.plain
#
# pour plus d info: https://www.sitepoint.com/use-code-snippets-atom/
#
# http://flight-manual.atom.io/using-atom/sections/basic-customization/#_cson




'.source.js':
  'console':
    'prefix': '!!'
    'body': 'console.log($1);'
  'jslint':
    'prefix': '!!!'
    'body': '/*jslint browser: true, devel: true, node: true, sloppy: true, stupid: true, sub: true, unused:false, unparam: true, "esnext": true, esversion: 6, -W008, -W030, -W033 */'
  'log array length':
    'prefix': 'llen'
    'body': 'console.log(\'${1:array} length\', ${1:array}.length);$2'
  'iffi':
    'prefix': 'iii'
    'body': """(function(){
        $1
        }());"""
  'exports':
    'prefix': 'me'
    'body': "module.exports = {};"
  'mongoose':
    'prefix': 'mmm'
    'body': """const mongoose = require('mongoose');

    mongoose.Promise = global.Promise; //ES6 faut dire quel type de promise.

    const db = mongoose.connect('mongodb://localhost/TodoApp', {
      useMongoClient: true,
    })
    .then(con => {
      console.log('connection reussi...')
    })
    .catch(err => {
      console.log(err)
    });"""
  'document.writeln':
    'prefix':'!@'
    'body':'document.writeln();'
  'catch':
    'prefix':'.cc'
    'body':'''.catch(err => {
      console.log(err)
    });'''
  'promesse':
    'prefix':'ppp'
    'body':'''.then(data => {
     console.log(data)
    })
    .catch(err => {
      console.log(err)
    });'''
  'effi$':
    'prefix':'eee'
    'body':"""$(function(){
       console.log("yo4");
      }()); """
  'liste des events':
    'prefix':'vvv'
    'body':"""$('truc').on("click", 'blur', "change",
    "dblclick", "focus", "focusin". "focusout",'hover',
    'keydown','keypress', 'keyup','moudown','mouseenter',
    'mouseleave', 'mousemove','mouseover', 'mouseup', 'resize',
    'scroll', 'select', 'submit'); """
  'import':
    'prefix':'^^'
    'body':'import {truc} from "./truc/truc.js"; '
  'reduxstore':
    'prefix':'reduxstore'
    'body': """
    import { createStore } from 'redux'

     //1er arg, combi.Reducer 2ieme arg, est le data
    const store = createStore(appReducer, DB)

      let unsubscribe = store.subscribe(() => {
        let state = store.getState();
        console.log('Changement', store.getState())
      });
    """
  '$return':
    'prefix':'rr'
    'body':"return "
  '$comm':
    'prefix':'cccc'
    'body':"""
    ///////////////////////////////////////////////////////////////////////////////////////////////
    ///                        ///$1/////                                                  ////
    ///////////////////////////////////////////////////////////////////////////////////////////////
    """
  'curry':
    'prefix':'curry'
    'body':"""function curry(func){
       return(...args) => {
         if (args.length >= func.length){
           return func.apply(null, args);
         }
         return curry(func.bind(null, ...args));
       }
    }"""
  'forof':
    'prefix':'foro'
    'body':"""for (let valeur of truc){
          console.log(valeur);
      } """
  'consFunc':
    'prefix':'FF'
    'body':'const $1 = ($2) => $3;'
  'funces6':
    'prefix':'...'
    'body':' ($2) => $3 '
  'return':
    'prefix':'r'
    'body':'return $1'
  'sctrict':
    'prefix':'!s'
    'body':'"use strict";'
  'document.querySelector':
    'prefix':'dq'
    'body':'document.querySelector("$1")'
  'window.listener':
    'prefix':'we'
    'body':'window.addEventListener( "$1", $2 );'
  'consCurry':
    'prefix':'CC'
    'body':'const $1 = curry(($2) => );'
  'comment':
    'prefix':'///'
    'body':'/*** $1 ***/'
  'togglecool':
    'prefix':'!t'
    'body':"""$('h1.logo').hover(function(e){
      $(this).toggleClass('shine', e.type === "mouseenter");  /// s assure que le mouseenter soit lui qui declache
      }); """
  'functionf':
    'prefix':'ff'
    'body':"""function $1(){
       $2
      }"""
  'constructor':
    'prefix':'ccc'
    'body':"""constructor (){

      }"""
  'const':
    'prefix':'cc'
    'body':"const"
  'under':
    'prefix':',,'
    'body':"_."
  'let':
    'prefix':'ll'
    'body':"let "
  'var':
    'prefix':'vv'
    'body':"var"
  'promise':
    'prefix':'np'
    'body':"new Promise(function (res,rej){ })"
  'describe':
    'prefix':'dd'
    'body':"""describe("", () => {
    	it("should existe", () => {

    	});
    });"""
  'itMocha':
    'prefix':'it'
    'body':"""it('$1', () => {

    });"""
  'return promise':
    'prefix':'rnp'
    'body':"return new Promise(function (res,rej){ });"
  'function':
    'prefix':'222'
    'body':"""(($1) => {
       $2
      })"""
  '$$':
    'prefix':'$$'
    'body':"`${$1}`"
  'describe':
    'prefix':'DD'
    'body':"""
  describe("Test de $1", () => {
  	it("Ca Devrait $2", () => {
      $3
  	});
  });
    """
  '+=':
    'prefix':'=='
    'body':"+= "
  'arrow':
    'prefix':'..'
    'body':"=> "
  'reducer':
    'prefix':'redu'
    'body':""" let reducer = (state = {name: 'Anonymous'}, action) => {

       switch (action.type) {
        case 'CHANGE_' $1:
        return {
          ...state,
          name: action.name
        }
        default:
         return state;
       }
     };
    """
  'R$':
    'prefix':'R$'
    'body':"${$1}"
  'Redux':
    'prefix':'Redux'
    'body':"""
    import * as redux from 'redux'
    console.log('test de redux')
    let stateDefault = {
      name: 'Anonymous',
      hobbies: []
    }
    let nextHobbyId = 1;  //ajoute un systeme d ID
      let reducer = (state = stateDefault, action) => {

        switch (action.type) {
         case 'CHANGE_NAME':
         return {
           ...state,     //pour le deuxieme tours, on doit ramener tout
           name: action.name
         }
         case 'ADD_HOBBY':  //pour l arr.
         return {           /// on retourne tout avant
           ...state,
           hobbies: [           ///ensuite pour l arr hobbies
             ...state.hobbies,     /// on retourne tout avant (meme si rien, en partant) , sinon on overwrite
             {
               id: nextHobbyId++,   //ajouter un Id
               hobby: action.hobby     //ensuite lobj qu on veut dans l arr
             }
           ]
         }
       case 'REMOVE_HOBBY':    // RETIRER de l arr, ce qu'on ne veut pas
       return {               /// on retourne tout avant
         ...state,
         hobbies: state.hobbies.filter((hobby) => {
           return hobby.id !== action.id          // on retourne tout ce qui n'a pas id: 2 finalement
         })
        }
         default:
          return state;
        }
      };
     let store = redux.createStore(reducer, redux.compose(
       window.devToolsExtension ? window.devToolsExtension() : f => f
     ));
     let unsubscribe = store.subscribe(() => {
       let state = store.getState();
       //document.getElementById('redux').innerHTML = state.name //permet meme de jouer en html
       console.log('name est', state.name )
     });
      store.dispatch({
        type: 'CHANGE_NAME',
        name: 'Ben'
      })
      //unsubscribe();  //BEnoit sortira pas. dispatch se fera pas.
      store.dispatch({
        type: 'CHANGE_NAME',
        name: 'Benoit'
      })
      store.dispatch({
        type: 'ADD_HOBBY',
        hobby: 'Courrir'
      })
    """
  'iterator':
    'prefix':'ii'
    'body':"iterator"
  'f22':
    'prefix':'...'
    'body':"($1) => {$2}"
  'Console-':
    'prefix':'!~'
    'body':'console.log($1)'

  'Mysql':
    'prefix': 'mysql'
    'body': """var mysql = require('mysql');

    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'root',
      database : 'my_db'
    });

    connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (err) throw err;

      console.log('The solution is: ', rows[0].solution);
    });

    connection.end(); """
  'easing Gsap':
    'prefix': 'ease'
    'body': 'ease: Power4.easeInOut,'
  'Class ES6':
    'prefix': '!class'
    'body': """class Classe {
      constructor(args, args2){
        this.args = args;
        this.args2 = args2;
      }
      nomdefunc(){
        console.log(`j'utilise ${this.args} avec ${this.args2} comme arguments`);
      }
    } """


'.source.jsx':
  'console':
    'prefix': '!!'
    'body': "console.log($1)"
  'state()':
    'prefix': 'RSS'
    'body': """import React from "react";

    const $1 = () => {
     return (
        <div className="NomduCompo">

        </div>
      )
    } ;
    export default $2
"""
  'constructor':
    'prefix': 'CC'
    'body': """constructor (props){
     super(props)
    }
    """
  'ReactClass':
    'prefix': 'RC'
    'body': """import React, {Component} from "react";
    import ReactDOM from 'react-dom';

    class $1 extends Component {
      constructor (props){
       super(props)
      }
      render() {
        return (
          <div>
            Bonjour!
          </div>
        );
      }
    }
    export default $1
    """
  'createClass':
    'prefix': 'RR'
    'body': """const App = React.createClass({
      render() {
        return (
          $1
        )
      }
    });
    export default App"""
  'commentsReact':
    'prefix': '==='
    'body': "{/*  */}"
  'routerpath':
    'prefix': 'PP'
    'body': "(this.props.location.pathname === '/')"
  'stateless':
    'prefix': 'RSsimple'
    'body': """export const App = () => (
         <div>
         </div>
        )
    """
  'Router':
    'prefix': 'RRR'
    'body': """render(
    <Router history={hashHistory}>
      <Route path="/" component={nomduContainer}/>
      <Route path="*" component={nom404} />
    </Router>,
    document.getElementById('react-container')
    )"""
  'importReact':
    'prefix': 'II'
    'body': """
    import React from "react";
    const { Component } = React
    import ReactDOM from "react-dom";
    const { render, findDOMNode  } = ReactDOM;
    """


'.text.html.basic':
  'div-section':
    'prefix': 'ss'
    'body': """<div class="section">
         <h2>$1</h2>
          <ul>
            <li>$2</li>
          </ul>
         <pre><code>
         $3
         </code></pre>
       </div>"""
  'component':
    'prefix': 'com'
    'body': 'component'
  'Partir html':
    'prefix':'!html'
    'body':"""<!DOCTYPE html>
    <html lang="">

    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page</title>
    <link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900,400italic" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

    <link rel="icon" href="data:;base64,iVBORwOKGO=" />
    <link rel="stylesheet" href="css/main.css">

    </head>

    <body>
    <div class="container">
      <div class="nav">
        <nav>
          <h1 class="logo">LOGO</h1>
          <ul>
            <li>ACCUEIL</li>
            <li>PRODUITS</li>
            <li>SERVICE</li>
            <li>CONTACT</li>
            </ul>
            </nav>
            </div>
            <header>
            <div class="pic">
            <h1>Bienvenue</h1>
            <h4>Maintenant tout est possible</h4>
            </div>
            </header>
            <article>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ratione temporibus labore, iusto voluptatum dicta, repudiandae, perspiciatis quos nam alias est distinctio deserunt qui id hic minima! Inventore, reprehenderit, sint.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ratione temporibus labore, iusto voluptatum dicta, repudiandae, perspiciatis quos nam alias est distinctio deserunt qui id hic minima! Inventore, reprehenderit, sint.</p>


            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ratione temporibus labore, iusto voluptatum dicta, repudiandae, perspiciatis quos nam alias est distinctio deserunt qui id hic minima! Inventore, reprehenderit, sint.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ratione temporibus labore, iusto voluptatum dicta, repudiandae, perspiciatis quos nam alias est distinctio deserunt qui id hic minima! Inventore, reprehenderit, sint.</p>

     </article>
     <button class="button">LANCE</button>
    </div>
     <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
     <script src="app/main.js"></script>
          </body>
       </html> """
  'Du code':
    'prefix':'cc'
    'body':"""<pre><code>
      $1
       </code></pre> """
  'jsx comments':
    'prefix':'==='
    'body':"""{/*
         $1
       */} """


'.source.css':
  'transitionBen':
    'prefix': 'tt'
    'body': """transition: all 0.35s ease-in-out;
    -webkit-transition: all 0.35s ease-in-out;"""
  'touch momentum':
    'prefix': 'touch'
    'body': """@media screen and (max-width: 768px) {
            .touch { //ajouter une class touch a ce point sur container
                 -webkit-overflow-scrolling: touch;
            }
    }"""
 'middle':
   'prefix': 'mmm'
   'body': """position:absolute;
    -webkit-transform:translate(-50%,-50%);
          transform:translate(-50%,-50%);
    left:50%; top:50%;"""
