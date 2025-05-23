﻿Graficas = new function () {

    this._Zonas = Array();
    this._Deptos = [["5","ANTIOQUIA"],["8","ATLÁNTICO"],["11","BOGOTÁ, D.C."],["13","BOLÍVAR"],["15","BOYACÁ"],["17","CALDAS"],["18","CAQUETÁ"],["19","CAUCA"],["20","CESAR"],["23","CÓRDOBA"],["25","CUNDINAMARCA"],["27","CHOCÓ"],["41","HUILA"],["44","LA GUAJIRA"],["47","MAGDALENA"],["50","META"],["52","NARIÑO"],["54","NORTE DE SANTANDER"],["63","QUINDIO"],["66","RISARALDA"],["68","SANTANDER"],["70","SUCRE"],["73","TOLIMA"],["76","VALLE DEL CAUCA"],["81","ARAUCA"],["85","CASANARE"],["86","PUTUMAYO"],["88","ARCHIPIÉLAGO DE SAN ANDRÉS, PROVIDENCIA Y SANTA CATALINA"],["91","AMAZONAS"],["94","GUAINÍA"],["95","GUAVIARE"],["97","VAUPÉS"],["99","VICHADA"]];
    this._Muni = [["5001","MEDELLÍN"],["5002","ABEJORRAL"],["5004","ABRIAQUÍ"],["5021","ALEJANDRÍA"],["5030","AMAGÁ"],["5031","AMALFI"],["5034","ANDES"],["5036","ANGELÓPOLIS"],["5038","ANGOSTURA"],["5040","ANORÍ"],["5042","SANTA FÉ DE ANTIOQUIA"],["5044","ANZÁ"],["5045","APARTADÓ"],["5051","ARBOLETES"],["5055","ARGELIA"],["5059","ARMENIA"],["5079","BARBOSA"],["5086","BELMIRA"],["5088","BELLO"],["5091","BETANIA"],["5093","BETULIA"],["5101","CIUDAD BOLÍVAR"],["5107","BRICEÑO"],["5113","BURITICÁ"],["5120","CÁCERES"],["5125","CAICEDO"],["5129","CALDAS"],["5134","CAMPAMENTO"],["5138","CAÑASGORDAS"],["5142","CARACOLÍ"],["5145","CARAMANTA"],["5147","CAREPA"],["5148","EL CARMEN DE VIBORAL"],["5150","CAROLINA"],["5154","CAUCASIA"],["5172","CHIGORODÓ"],["5190","CISNEROS"],["5197","COCORNÁ"],["5206","CONCEPCIÓN"],["5209","CONCORDIA"],["5212","COPACABANA"],["5234","DABEIBA"],["5237","DONMATÍAS"],["5240","EBÉJICO"],["5250","EL BAGRE"],["5264","ENTRERRÍOS"],["5266","ENVIGADO"],["5282","FREDONIA"],["5284","FRONTINO"],["5306","GIRALDO"],["5308","GIRARDOTA"],["5310","GÓMEZ PLATA"],["5313","GRANADA"],["5315","GUADALUPE"],["5318","GUARNE"],["5321","GUATAPÉ"],["5347","HELICONIA"],["5353","HISPANIA"],["5360","ITAGÜÍ"],["5361","ITUANGO"],["5364","JARDÍN"],["5368","JERICÓ"],["5376","LA CEJA"],["5380","LA ESTRELLA"],["5390","LA PINTADA"],["5400","LA UNIÓN"],["5411","LIBORINA"],["5425","MACEO"],["5440","MARINILLA"],["5467","MONTEBELLO"],["5475","MURINDÓ"],["5480","MUTATÁ"],["5483","NARIÑO"],["5490","NECOCLÍ"],["5495","NECHÍ"],["5501","OLAYA"],["5541","PEÑOL"],["5543","PEQUE"],["5576","PUEBLORRICO"],["5579","PUERTO BERRÍO"],["5585","PUERTO NARE"],["5591","PUERTO TRIUNFO"],["5604","REMEDIOS"],["5607","RETIRO"],["5615","RIONEGRO"],["5628","SABANALARGA"],["5631","SABANETA"],["5642","SALGAR"],["5647","SAN ANDRÉS DE CUERQUÍA"],["5649","SAN CARLOS"],["5652","SAN FRANCISCO"],["5656","SAN JERÓNIMO"],["5658","SAN JOSÉ DE LA MONTAÑA"],["5659","SAN JUAN DE URABÁ"],["5660","SAN LUIS"],["5664","SAN PEDRO DE LOS MILAGROS"],["5665","SAN PEDRO DE URABÁ"],["5667","SAN RAFAEL"],["5670","SAN ROQUE"],["5674","SAN VICENTE FERRER"],["5679","SANTA BÁRBARA"],["5686","SANTA ROSA DE OSOS"],["5690","SANTO DOMINGO"],["5697","EL SANTUARIO"],["5736","SEGOVIA"],["5756","SONSÓN"],["5761","SOPETRÁN"],["5789","TÁMESIS"],["5790","TARAZÁ"],["5792","TARSO"],["5809","TITIRIBÍ"],["5819","TOLEDO"],["5837","TURBO"],["5842","URAMITA"],["5847","URRAO"],["5854","VALDIVIA"],["5856","VALPARAÍSO"],["5858","VEGACHÍ"],["5861","VENECIA"],["5873","VIGÍA DEL FUERTE"],["5885","YALÍ"],["5887","YARUMAL"],["5890","YOLOMBÓ"],["5893","YONDÓ"],["5895","ZARAGOZA"],["8001","BARRANQUILLA"],["8078","BARANOA"],["8137","CAMPO DE LA CRUZ"],["8141","CANDELARIA"],["8296","GALAPA"],["8372","JUAN DE ACOSTA"],["8421","LURUACO"],["8433","MALAMBO"],["8436","MANATÍ"],["8520","PALMAR DE VARELA"],["8549","PIOJÓ"],["8558","POLONUEVO"],["8560","PONEDERA"],["8573","PUERTO COLOMBIA"],["8606","REPELÓN"],["8634","SABANAGRANDE"],["8638","SABANALARGA"],["8675","SANTA LUCÍA"],["8685","SANTO TOMÁS"],["8758","SOLEDAD"],["8770","SUAN"],["8832","TUBARÁ"],["8849","USIACURÍ"],["11001","BOGOTÁ, D.C."],["13001","CARTAGENA DE INDIAS"],["13006","ACHÍ"],["13030","ALTOS DEL ROSARIO"],["13042","ARENAL"],["13052","ARJONA"],["13062","ARROYOHONDO"],["13074","BARRANCO DE LOBA"],["13140","CALAMAR"],["13160","CANTAGALLO"],["13188","CICUCO"],["13212","CÓRDOBA"],["13222","CLEMENCIA"],["13244","EL CARMEN DE BOLÍVAR"],["13248","EL GUAMO"],["13268","EL PEÑÓN"],["13300","HATILLO DE LOBA"],["13430","MAGANGUÉ"],["13433","MAHATES"],["13440","MARGARITA"],["13442","MARÍA LA BAJA"],["13458","MONTECRISTO"],["13468","SANTA CRUZ DE MOMPOX"],["13473","MORALES"],["13490","NOROSÍ"],["13549","PINILLOS"],["13580","REGIDOR"],["13600","RÍO VIEJO"],["13620","SAN CRISTÓBAL"],["13647","SAN ESTANISLAO"],["13650","SAN FERNANDO"],["13654","SAN JACINTO"],["13655","SAN JACINTO DEL CAUCA"],["13657","SAN JUAN NEPOMUCENO"],["13667","SAN MARTÍN DE LOBA"],["13670","SAN PABLO"],["13673","SANTA CATALINA"],["13683","SANTA ROSA"],["13688","SANTA ROSA DEL SUR"],["13744","SIMITÍ"],["13760","SOPLAVIENTO"],["13780","TALAIGUA NUEVO"],["13810","TIQUISIO"],["13836","TURBACO"],["13838","TURBANA"],["13873","VILLANUEVA"],["13894","ZAMBRANO"],["15001","TUNJA"],["15022","ALMEIDA"],["15047","AQUITANIA"],["15051","ARCABUCO"],["15087","BELÉN"],["15090","BERBEO"],["15092","BETÉITIVA"],["15097","BOAVITA"],["15104","BOYACÁ"],["15106","BRICEÑO"],["15109","BUENAVISTA"],["15114","BUSBANZÁ"],["15131","CALDAS"],["15135","CAMPOHERMOSO"],["15162","CERINZA"],["15172","CHINAVITA"],["15176","CHIQUINQUIRÁ"],["15180","CHISCAS"],["15183","CHITA"],["15185","CHITARAQUE"],["15187","CHIVATÁ"],["15189","CIÉNEGA"],["15204","CÓMBITA"],["15212","COPER"],["15215","CORRALES"],["15218","COVARACHÍA"],["15223","CUBARÁ"],["15224","CUCAITA"],["15226","CUÍTIVA"],["15232","CHÍQUIZA"],["15236","CHIVOR"],["15238","DUITAMA"],["15244","EL COCUY"],["15248","EL ESPINO"],["15272","FIRAVITOBA"],["15276","FLORESTA"],["15293","GACHANTIVÁ"],["15296","GÁMEZA"],["15299","GARAGOA"],["15317","GUACAMAYAS"],["15322","GUATEQUE"],["15325","GUAYATÁ"],["15332","GÜICÁN DE LA SIERRA"],["15362","IZA"],["15367","JENESANO"],["15368","JERICÓ"],["15377","LABRANZAGRANDE"],["15380","LA CAPILLA"],["15401","LA VICTORIA"],["15403","LA UVITA"],["15407","VILLA DE LEYVA"],["15425","MACANAL"],["15442","MARIPÍ"],["15455","MIRAFLORES"],["15464","MONGUA"],["15466","MONGUÍ"],["15469","MONIQUIRÁ"],["15476","MOTAVITA"],["15480","MUZO"],["15491","NOBSA"],["15494","NUEVO COLÓN"],["15500","OICATÁ"],["15507","OTANCHE"],["15511","PACHAVITA"],["15514","PÁEZ"],["15516","PAIPA"],["15518","PAJARITO"],["15522","PANQUEBA"],["15531","PAUNA"],["15533","PAYA"],["15537","PAZ DE RÍO"],["15542","PESCA"],["15550","PISBA"],["15572","PUERTO BOYACÁ"],["15580","QUÍPAMA"],["15599","RAMIRIQUÍ"],["15600","RÁQUIRA"],["15621","RONDÓN"],["15632","SABOYÁ"],["15638","SÁCHICA"],["15646","SAMACÁ"],["15660","SAN EDUARDO"],["15664","SAN JOSÉ DE PARE"],["15667","SAN LUIS DE GACENO"],["15673","SAN MATEO"],["15676","SAN MIGUEL DE SEMA"],["15681","SAN PABLO DE BORBUR"],["15686","SANTANA"],["15690","SANTA MARÍA"],["15693","SANTA ROSA DE VITERBO"],["15696","SANTA SOFÍA"],["15720","SATIVANORTE"],["15723","SATIVASUR"],["15740","SIACHOQUE"],["15753","SOATÁ"],["15755","SOCOTÁ"],["15757","SOCHA"],["15759","SOGAMOSO"],["15761","SOMONDOCO"],["15762","SORA"],["15763","SOTAQUIRÁ"],["15764","SORACÁ"],["15774","SUSACÓN"],["15776","SUTAMARCHÁN"],["15778","SUTATENZA"],["15790","TASCO"],["15798","TENZA"],["15804","TIBANÁ"],["15806","TIBASOSA"],["15808","TINJACÁ"],["15810","TIPACOQUE"],["15814","TOCA"],["15816","TOGÜÍ"],["15820","TÓPAGA"],["15822","TOTA"],["15832","TUNUNGUÁ"],["15835","TURMEQUÉ"],["15837","TUTA"],["15839","TUTAZÁ"],["15842","ÚMBITA"],["15861","VENTAQUEMADA"],["15879","VIRACACHÁ"],["15897","ZETAQUIRA"],["17001","MANIZALES"],["17013","AGUADAS"],["17042","ANSERMA"],["17050","ARANZAZU"],["17088","BELALCÁZAR"],["17174","CHINCHINÁ"],["17272","FILADELFIA"],["17380","LA DORADA"],["17388","LA MERCED"],["17433","MANZANARES"],["17442","MARMATO"],["17444","MARQUETALIA"],["17446","MARULANDA"],["17486","NEIRA"],["17495","NORCASIA"],["17513","PÁCORA"],["17524","PALESTINA"],["17541","PENSILVANIA"],["17614","RIOSUCIO"],["17616","RISARALDA"],["17653","SALAMINA"],["17662","SAMANÁ"],["17665","SAN JOSÉ"],["17777","SUPÍA"],["17867","VICTORIA"],["17873","VILLAMARÍA"],["17877","VITERBO"],["18001","FLORENCIA"],["18029","ALBANIA"],["18094","BELÉN DE LOS ANDAQUÍES"],["18150","CARTAGENA DEL CHAIRÁ"],["18205","CURILLO"],["18247","EL DONCELLO"],["18256","EL PAUJÍL"],["18410","LA MONTAÑITA"],["18460","MILÁN"],["18479","MORELIA"],["18592","PUERTO RICO"],["18610","SAN JOSÉ DEL FRAGUA"],["18753","SAN VICENTE DEL CAGUÁN"],["18756","SOLANO"],["18785","SOLITA"],["18860","VALPARAÍSO"],["19001","POPAYÁN"],["19022","ALMAGUER"],["19050","ARGELIA"],["19075","BALBOA"],["19100","BOLÍVAR"],["19110","BUENOS AIRES"],["19130","CAJIBÍO"],["19137","CALDONO"],["19142","CALOTO"],["19212","CORINTO"],["19256","EL TAMBO"],["19290","FLORENCIA"],["19300","GUACHENÉ"],["19318","GUAPI"],["19355","INZÁ"],["19364","JAMBALÓ"],["19392","LA SIERRA"],["19397","LA VEGA"],["19418","LÓPEZ DE MICAY"],["19450","MERCADERES"],["19455","MIRANDA"],["19473","MORALES"],["19513","PADILLA"],["19517","PÁEZ"],["19532","PATÍA"],["19533","PIAMONTE"],["19548","PIENDAMÓ - TUNÍA"],["19573","PUERTO TEJADA"],["19585","PURACÉ"],["19622","ROSAS"],["19693","SAN SEBASTIÁN"],["19698","SANTANDER DE QUILICHAO"],["19701","SANTA ROSA"],["19743","SILVIA"],["19760","SOTARÁ PAISPAMBA"],["19780","SUÁREZ"],["19785","SUCRE"],["19807","TIMBÍO"],["19809","TIMBIQUÍ"],["19821","TORIBÍO"],["19824","TOTORÓ"],["19845","VILLA RICA"],["20001","VALLEDUPAR"],["20011","AGUACHICA"],["20013","AGUSTÍN CODAZZI"],["20032","ASTREA"],["20045","BECERRIL"],["20060","BOSCONIA"],["20175","CHIMICHAGUA"],["20178","CHIRIGUANÁ"],["20228","CURUMANÍ"],["20238","EL COPEY"],["20250","EL PASO"],["20295","GAMARRA"],["20310","GONZÁLEZ"],["20383","LA GLORIA"],["20400","LA JAGUA DE IBIRICO"],["20443","MANAURE BALCÓN DEL CESAR"],["20517","PAILITAS"],["20550","PELAYA"],["20570","PUEBLO BELLO"],["20614","RÍO DE ORO"],["20621","LA PAZ"],["20710","SAN ALBERTO"],["20750","SAN DIEGO"],["20770","SAN MARTÍN"],["20787","TAMALAMEQUE"],["23001","MONTERÍA"],["23068","AYAPEL"],["23079","BUENAVISTA"],["23090","CANALETE"],["23162","CERETÉ"],["23168","CHIMÁ"],["23182","CHINÚ"],["23189","CIÉNAGA DE ORO"],["23300","COTORRA"],["23350","LA APARTADA"],["23417","LORICA"],["23419","LOS CÓRDOBAS"],["23464","MOMIL"],["23466","MONTELÍBANO"],["23500","MOÑITOS"],["23555","PLANETA RICA"],["23570","PUEBLO NUEVO"],["23574","PUERTO ESCONDIDO"],["23580","PUERTO LIBERTADOR"],["23586","PURÍSIMA DE LA CONCEPCIÓN"],["23660","SAHAGÚN"],["23670","SAN ANDRÉS DE SOTAVENTO"],["23672","SAN ANTERO"],["23675","SAN BERNARDO DEL VIENTO"],["23678","SAN CARLOS"],["23682","SAN JOSÉ DE URÉ"],["23686","SAN PELAYO"],["23807","TIERRALTA"],["23815","TUCHÍN"],["23855","VALENCIA"],["25001","AGUA DE DIOS"],["25019","ALBÁN"],["25035","ANAPOIMA"],["25040","ANOLAIMA"],["25053","ARBELÁEZ"],["25086","BELTRÁN"],["25095","BITUIMA"],["25099","BOJACÁ"],["25120","CABRERA"],["25123","CACHIPAY"],["25126","CAJICÁ"],["25148","CAPARRAPÍ"],["25151","CÁQUEZA"],["25154","CARMEN DE CARUPA"],["25168","CHAGUANÍ"],["25175","CHÍA"],["25178","CHIPAQUE"],["25181","CHOACHÍ"],["25183","CHOCONTÁ"],["25200","COGUA"],["25214","COTA"],["25224","CUCUNUBÁ"],["25245","EL COLEGIO"],["25258","EL PEÑÓN"],["25260","EL ROSAL"],["25269","FACATATIVÁ"],["25279","FÓMEQUE"],["25281","FOSCA"],["25286","FUNZA"],["25288","FÚQUENE"],["25290","FUSAGASUGÁ"],["25293","GACHALÁ"],["25295","GACHANCIPÁ"],["25297","GACHETÁ"],["25299","GAMA"],["25307","GIRARDOT"],["25312","GRANADA"],["25317","GUACHETÁ"],["25320","GUADUAS"],["25322","GUASCA"],["25324","GUATAQUÍ"],["25326","GUATAVITA"],["25328","GUAYABAL DE SÍQUIMA"],["25335","GUAYABETAL"],["25339","GUTIÉRREZ"],["25368","JERUSALÉN"],["25372","JUNÍN"],["25377","LA CALERA"],["25386","LA MESA"],["25394","LA PALMA"],["25398","LA PEÑA"],["25402","LA VEGA"],["25407","LENGUAZAQUE"],["25426","MACHETÁ"],["25430","MADRID"],["25436","MANTA"],["25438","MEDINA"],["25473","MOSQUERA"],["25483","NARIÑO"],["25486","NEMOCÓN"],["25488","NILO"],["25489","NIMAIMA"],["25491","NOCAIMA"],["25506","VENECIA"],["25513","PACHO"],["25518","PAIME"],["25524","PANDI"],["25530","PARATEBUENO"],["25535","PASCA"],["25572","PUERTO SALGAR"],["25580","PULÍ"],["25592","QUEBRADANEGRA"],["25594","QUETAME"],["25596","QUIPILE"],["25599","APULO"],["25612","RICAURTE"],["25645","SAN ANTONIO DEL TEQUENDAMA"],["25649","SAN BERNARDO"],["25653","SAN CAYETANO"],["25658","SAN FRANCISCO"],["25662","SAN JUAN DE RIOSECO"],["25718","SASAIMA"],["25736","SESQUILÉ"],["25740","SIBATÉ"],["25743","SILVANIA"],["25745","SIMIJACA"],["25754","SOACHA"],["25758","SOPÓ"],["25769","SUBACHOQUE"],["25772","SUESCA"],["25777","SUPATÁ"],["25779","SUSA"],["25781","SUTATAUSA"],["25785","TABIO"],["25793","TAUSA"],["25797","TENA"],["25799","TENJO"],["25805","TIBACUY"],["25807","TIBIRITA"],["25815","TOCAIMA"],["25817","TOCANCIPÁ"],["25823","TOPAIPÍ"],["25839","UBALÁ"],["25841","UBAQUE"],["25843","VILLA DE SAN DIEGO DE UBATÉ"],["25845","UNE"],["25851","ÚTICA"],["25862","VERGARA"],["25867","VIANÍ"],["25871","VILLAGÓMEZ"],["25873","VILLAPINZÓN"],["25875","VILLETA"],["25878","VIOTÁ"],["25885","YACOPÍ"],["25898","ZIPACÓN"],["25899","ZIPAQUIRÁ"],["27001","QUIBDÓ"],["27006","ACANDÍ"],["27025","ALTO BAUDÓ"],["27050","ATRATO"],["27073","BAGADÓ"],["27075","BAHÍA SOLANO"],["27077","BAJO BAUDÓ"],["27099","BOJAYÁ"],["27135","EL CANTÓN DEL SAN PABLO"],["27150","CARMEN DEL DARIÉN"],["27160","CÉRTEGUI"],["27205","CONDOTO"],["27245","EL CARMEN DE ATRATO"],["27250","EL LITORAL DEL SAN JUAN"],["27361","ISTMINA"],["27372","JURADÓ"],["27413","LLORÓ"],["27425","MEDIO ATRATO"],["27430","MEDIO BAUDÓ"],["27450","MEDIO SAN JUAN"],["27491","NÓVITA"],["27495","NUQUÍ"],["27580","RÍO IRÓ"],["27600","RÍO QUITO"],["27615","RIOSUCIO"],["27660","SAN JOSÉ DEL PALMAR"],["27745","SIPÍ"],["27787","TADÓ"],["27800","UNGUÍA"],["27810","UNIÓN PANAMERICANA"],["41001","NEIVA"],["41006","ACEVEDO"],["41013","AGRADO"],["41016","AIPE"],["41020","ALGECIRAS"],["41026","ALTAMIRA"],["41078","BARAYA"],["41132","CAMPOALEGRE"],["41206","COLOMBIA"],["41244","ELÍAS"],["41298","GARZÓN"],["41306","GIGANTE"],["41319","GUADALUPE"],["41349","HOBO"],["41357","ÍQUIRA"],["41359","ISNOS"],["41378","LA ARGENTINA"],["41396","LA PLATA"],["41483","NÁTAGA"],["41503","OPORAPA"],["41518","PAICOL"],["41524","PALERMO"],["41530","PALESTINA"],["41548","PITAL"],["41551","PITALITO"],["41615","RIVERA"],["41660","SALADOBLANCO"],["41668","SAN AGUSTÍN"],["41676","SANTA MARÍA"],["41770","SUAZA"],["41791","TARQUI"],["41797","TESALIA"],["41799","TELLO"],["41801","TERUEL"],["41807","TIMANÁ"],["41872","VILLAVIEJA"],["41885","YAGUARÁ"],["44001","RIOHACHA"],["44035","ALBANIA"],["44078","BARRANCAS"],["44090","DIBULLA"],["44098","DISTRACCIÓN"],["44110","EL MOLINO"],["44279","FONSECA"],["44378","HATONUEVO"],["44420","LA JAGUA DEL PILAR"],["44430","MAICAO"],["44560","MANAURE"],["44650","SAN JUAN DEL CESAR"],["44847","URIBIA"],["44855","URUMITA"],["44874","VILLANUEVA"],["47001","SANTA MARTA"],["47030","ALGARROBO"],["47053","ARACATACA"],["47058","ARIGUANÍ"],["47161","CERRO DE SAN ANTONIO"],["47170","CHIVOLO"],["47189","CIÉNAGA"],["47205","CONCORDIA"],["47245","EL BANCO"],["47258","EL PIÑÓN"],["47268","EL RETÉN"],["47288","FUNDACIÓN"],["47318","GUAMAL"],["47460","NUEVA GRANADA"],["47541","PEDRAZA"],["47545","PIJIÑO DEL CARMEN"],["47551","PIVIJAY"],["47555","PLATO"],["47570","PUEBLOVIEJO"],["47605","REMOLINO"],["47660","SABANAS DE SAN ÁNGEL"],["47675","SALAMINA"],["47692","SAN SEBASTIÁN DE BUENAVISTA"],["47703","SAN ZENÓN"],["47707","SANTA ANA"],["47720","SANTA BÁRBARA DE PINTO"],["47745","SITIONUEVO"],["47798","TENERIFE"],["47960","ZAPAYÁN"],["47980","ZONA BANANERA"],["50001","VILLAVICENCIO"],["50006","ACACÍAS"],["50110","BARRANCA DE UPÍA"],["50124","CABUYARO"],["50150","CASTILLA LA NUEVA"],["50223","CUBARRAL"],["50226","CUMARAL"],["50245","EL CALVARIO"],["50251","EL CASTILLO"],["50270","EL DORADO"],["50287","FUENTE DE ORO"],["50313","GRANADA"],["50318","GUAMAL"],["50325","MAPIRIPÁN"],["50330","MESETAS"],["50350","LA MACARENA"],["50370","URIBE"],["50400","LEJANÍAS"],["50450","PUERTO CONCORDIA"],["50568","PUERTO GAITÁN"],["50573","PUERTO LÓPEZ"],["50577","PUERTO LLERAS"],["50590","PUERTO RICO"],["50606","RESTREPO"],["50680","SAN CARLOS DE GUAROA"],["50683","SAN JUAN DE ARAMA"],["50686","SAN JUANITO"],["50689","SAN MARTÍN"],["50711","VISTAHERMOSA"],["52001","PASTO"],["52019","ALBÁN"],["52022","ALDANA"],["52036","ANCUYA"],["52051","ARBOLEDA"],["52079","BARBACOAS"],["52083","BELÉN"],["52110","BUESACO"],["52203","COLÓN"],["52207","CONSACÁ"],["52210","CONTADERO"],["52215","CÓRDOBA"],["52224","CUASPUD CARLOSAMA"],["52227","CUMBAL"],["52233","CUMBITARA"],["52240","CHACHAGÜÍ"],["52250","EL CHARCO"],["52254","EL PEÑOL"],["52256","EL ROSARIO"],["52258","EL TABLÓN DE GÓMEZ"],["52260","EL TAMBO"],["52287","FUNES"],["52317","GUACHUCAL"],["52320","GUAITARILLA"],["52323","GUALMATÁN"],["52352","ILES"],["52354","IMUÉS"],["52356","IPIALES"],["52378","LA CRUZ"],["52381","LA FLORIDA"],["52385","LA LLANADA"],["52390","LA TOLA"],["52399","LA UNIÓN"],["52405","LEIVA"],["52411","LINARES"],["52418","LOS ANDES"],["52427","MAGÜÍ"],["52435","MALLAMA"],["52473","MOSQUERA"],["52480","NARIÑO"],["52490","OLAYA HERRERA"],["52506","OSPINA"],["52520","FRANCISCO PIZARRO"],["52540","POLICARPA"],["52560","POTOSÍ"],["52565","PROVIDENCIA"],["52573","PUERRES"],["52585","PUPIALES"],["52612","RICAURTE"],["52621","ROBERTO PAYÁN"],["52678","SAMANIEGO"],["52683","SANDONÁ"],["52685","SAN BERNARDO"],["52687","SAN LORENZO"],["52693","SAN PABLO"],["52694","SAN PEDRO DE CARTAGO"],["52696","SANTA BÁRBARA"],["52699","SANTACRUZ"],["52720","SAPUYES"],["52786","TAMINANGO"],["52788","TANGUA"],["52835","SAN ANDRÉS DE TUMACO"],["52838","TÚQUERRES"],["52885","YACUANQUER"],["54001","SAN JOSÉ DE CÚCUTA"],["54003","ÁBREGO"],["54051","ARBOLEDAS"],["54099","BOCHALEMA"],["54109","BUCARASICA"],["54125","CÁCOTA"],["54128","CÁCHIRA"],["54172","CHINÁCOTA"],["54174","CHITAGÁ"],["54206","CONVENCIÓN"],["54223","CUCUTILLA"],["54239","DURANIA"],["54245","EL CARMEN"],["54250","EL TARRA"],["54261","EL ZULIA"],["54313","GRAMALOTE"],["54344","HACARÍ"],["54347","HERRÁN"],["54377","LABATECA"],["54385","LA ESPERANZA"],["54398","LA PLAYA"],["54405","LOS PATIOS"],["54418","LOURDES"],["54480","MUTISCUA"],["54498","OCAÑA"],["54518","PAMPLONA"],["54520","PAMPLONITA"],["54553","PUERTO SANTANDER"],["54599","RAGONVALIA"],["54660","SALAZAR"],["54670","SAN CALIXTO"],["54673","SAN CAYETANO"],["54680","SANTIAGO"],["54720","SARDINATA"],["54743","SILOS"],["54800","TEORAMA"],["54810","TIBÚ"],["54820","TOLEDO"],["54871","VILLA CARO"],["54874","VILLA DEL ROSARIO"],["63001","ARMENIA"],["63111","BUENAVISTA"],["63130","CALARCÁ"],["63190","CIRCASIA"],["63212","CÓRDOBA"],["63272","FILANDIA"],["63302","GÉNOVA"],["63401","LA TEBAIDA"],["63470","MONTENEGRO"],["63548","PIJAO"],["63594","QUIMBAYA"],["63690","SALENTO"],["66001","PEREIRA"],["66045","APÍA"],["66075","BALBOA"],["66088","BELÉN DE UMBRÍA"],["66170","DOSQUEBRADAS"],["66318","GUÁTICA"],["66383","LA CELIA"],["66400","LA VIRGINIA"],["66440","MARSELLA"],["66456","MISTRATÓ"],["66572","PUEBLO RICO"],["66594","QUINCHÍA"],["66682","SANTA ROSA DE CABAL"],["66687","SANTUARIO"],["68001","BUCARAMANGA"],["68013","AGUADA"],["68020","ALBANIA"],["68051","ARATOCA"],["68077","BARBOSA"],["68079","BARICHARA"],["68081","BARRANCABERMEJA"],["68092","BETULIA"],["68101","BOLÍVAR"],["68121","CABRERA"],["68132","CALIFORNIA"],["68147","CAPITANEJO"],["68152","CARCASÍ"],["68160","CEPITÁ"],["68162","CERRITO"],["68167","CHARALÁ"],["68169","CHARTA"],["68176","CHIMA"],["68179","CHIPATÁ"],["68190","CIMITARRA"],["68207","CONCEPCIÓN"],["68209","CONFINES"],["68211","CONTRATACIÓN"],["68217","COROMORO"],["68229","CURITÍ"],["68235","EL CARMEN DE CHUCURÍ"],["68245","EL GUACAMAYO"],["68250","EL PEÑÓN"],["68255","EL PLAYÓN"],["68264","ENCINO"],["68266","ENCISO"],["68271","FLORIÁN"],["68276","FLORIDABLANCA"],["68296","GALÁN"],["68298","GÁMBITA"],["68307","GIRÓN"],["68318","GUACA"],["68320","GUADALUPE"],["68322","GUAPOTÁ"],["68324","GUAVATÁ"],["68327","GÜEPSA"],["68344","HATO"],["68368","JESÚS MARÍA"],["68370","JORDÁN"],["68377","LA BELLEZA"],["68385","LANDÁZURI"],["68397","LA PAZ"],["68406","LEBRIJA"],["68418","LOS SANTOS"],["68425","MACARAVITA"],["68432","MÁLAGA"],["68444","MATANZA"],["68464","MOGOTES"],["68468","MOLAGAVITA"],["68498","OCAMONTE"],["68500","OIBA"],["68502","ONZAGA"],["68522","PALMAR"],["68524","PALMAS DEL SOCORRO"],["68533","PÁRAMO"],["68547","PIEDECUESTA"],["68549","PINCHOTE"],["68572","PUENTE NACIONAL"],["68573","PUERTO PARRA"],["68575","PUERTO WILCHES"],["68615","RIONEGRO"],["68655","SABANA DE TORRES"],["68669","SAN ANDRÉS"],["68673","SAN BENITO"],["68679","SAN GIL"],["68682","SAN JOAQUÍN"],["68684","SAN JOSÉ DE MIRANDA"],["68686","SAN MIGUEL"],["68689","SAN VICENTE DE CHUCURÍ"],["68705","SANTA BÁRBARA"],["68720","SANTA HELENA DEL OPÓN"],["68745","SIMACOTA"],["68755","SOCORRO"],["68770","SUAITA"],["68773","SUCRE"],["68780","SURATÁ"],["68820","TONA"],["68855","VALLE DE SAN JOSÉ"],["68861","VÉLEZ"],["68867","VETAS"],["68872","VILLANUEVA"],["68895","ZAPATOCA"],["70001","SINCELEJO"],["70110","BUENAVISTA"],["70124","CAIMITO"],["70204","COLOSÓ"],["70215","COROZAL"],["70221","COVEÑAS"],["70230","CHALÁN"],["70233","EL ROBLE"],["70235","GALERAS"],["70265","GUARANDA"],["70400","LA UNIÓN"],["70418","LOS PALMITOS"],["70429","MAJAGUAL"],["70473","MORROA"],["70508","OVEJAS"],["70523","PALMITO"],["70670","SAMPUÉS"],["70678","SAN BENITO ABAD"],["70702","SAN JUAN DE BETULIA"],["70708","SAN MARCOS"],["70713","SAN ONOFRE"],["70717","SAN PEDRO"],["70742","SAN LUIS DE SINCÉ"],["70771","SUCRE"],["70820","SANTIAGO DE TOLÚ"],["70823","SAN JOSÉ DE TOLUVIEJO"],["73001","IBAGUÉ"],["73024","ALPUJARRA"],["73026","ALVARADO"],["73030","AMBALEMA"],["73043","ANZOÁTEGUI"],["73055","ARMERO"],["73067","ATACO"],["73124","CAJAMARCA"],["73148","CARMEN DE APICALÁ"],["73152","CASABIANCA"],["73168","CHAPARRAL"],["73200","COELLO"],["73217","COYAIMA"],["73226","CUNDAY"],["73236","DOLORES"],["73268","ESPINAL"],["73270","FALAN"],["73275","FLANDES"],["73283","FRESNO"],["73319","GUAMO"],["73347","HERVEO"],["73349","HONDA"],["73352","ICONONZO"],["73408","LÉRIDA"],["73411","LÍBANO"],["73443","SAN SEBASTIÁN DE MARIQUITA"],["73449","MELGAR"],["73461","MURILLO"],["73483","NATAGAIMA"],["73504","ORTEGA"],["73520","PALOCABILDO"],["73547","PIEDRAS"],["73555","PLANADAS"],["73563","PRADO"],["73585","PURIFICACIÓN"],["73616","RIOBLANCO"],["73622","RONCESVALLES"],["73624","ROVIRA"],["73671","SALDAÑA"],["73675","SAN ANTONIO"],["73678","SAN LUIS"],["73686","SANTA ISABEL"],["73770","SUÁREZ"],["73854","VALLE DE SAN JUAN"],["73861","VENADILLO"],["73870","VILLAHERMOSA"],["73873","VILLARRICA"],["76001","CALI"],["76020","ALCALÁ"],["76036","ANDALUCÍA"],["76041","ANSERMANUEVO"],["76054","ARGELIA"],["76100","BOLÍVAR"],["76109","BUENAVENTURA"],["76111","GUADALAJARA DE BUGA"],["76113","BUGALAGRANDE"],["76122","CAICEDONIA"],["76126","CALIMA"],["76130","CANDELARIA"],["76147","CARTAGO"],["76233","DAGUA"],["76243","EL ÁGUILA"],["76246","EL CAIRO"],["76248","EL CERRITO"],["76250","EL DOVIO"],["76275","FLORIDA"],["76306","GINEBRA"],["76318","GUACARÍ"],["76364","JAMUNDÍ"],["76377","LA CUMBRE"],["76400","LA UNIÓN"],["76403","LA VICTORIA"],["76497","OBANDO"],["76520","PALMIRA"],["76563","PRADERA"],["76606","RESTREPO"],["76616","RIOFRÍO"],["76622","ROLDANILLO"],["76670","SAN PEDRO"],["76736","SEVILLA"],["76823","TORO"],["76828","TRUJILLO"],["76834","TULUÁ"],["76845","ULLOA"],["76863","VERSALLES"],["76869","VIJES"],["76890","YOTOCO"],["76892","YUMBO"],["76895","ZARZAL"],["81001","ARAUCA"],["81065","ARAUQUITA"],["81220","CRAVO NORTE"],["81300","FORTUL"],["81591","PUERTO RONDÓN"],["81736","SARAVENA"],["81794","TAME"],["85001","YOPAL"],["85010","AGUAZUL"],["85015","CHÁMEZA"],["85125","HATO COROZAL"],["85136","LA SALINA"],["85139","MANÍ"],["85162","MONTERREY"],["85225","NUNCHÍA"],["85230","OROCUÉ"],["85250","PAZ DE ARIPORO"],["85263","PORE"],["85279","RECETOR"],["85300","SABANALARGA"],["85315","SÁCAMA"],["85325","SAN LUIS DE PALENQUE"],["85400","TÁMARA"],["85410","TAURAMENA"],["85430","TRINIDAD"],["85440","VILLANUEVA"],["86001","MOCOA"],["86219","COLÓN"],["86320","ORITO"],["86568","PUERTO ASÍS"],["86569","PUERTO CAICEDO"],["86571","PUERTO GUZMÁN"],["86573","PUERTO LEGUÍZAMO"],["86749","SIBUNDOY"],["86755","SAN FRANCISCO"],["86757","SAN MIGUEL"],["86760","SANTIAGO"],["86865","VALLE DEL GUAMUEZ"],["86885","VILLAGARZÓN"],["88001","SAN ANDRÉS"],["88564","PROVIDENCIA"],["91001","LETICIA"],["91263","EL ENCANTO"],["91405","LA CHORRERA"],["91407","LA PEDRERA"],["91430","LA VICTORIA"],["91460","MIRITÍ - PARANÁ"],["91530","PUERTO ALEGRÍA"],["91536","PUERTO ARICA"],["91540","PUERTO NARIÑO"],["91669","PUERTO SANTANDER"],["91798","TARAPACÁ"],["94001","INÍRIDA"],["94343","BARRANCOMINAS"],["94883","SAN FELIPE"],["94884","PUERTO COLOMBIA"],["94885","LA GUADALUPE"],["94886","CACAHUAL"],["94887","PANA PANA"],["94888","MORICHAL"],["95001","SAN JOSÉ DEL GUAVIARE"],["95015","CALAMAR"],["95025","EL RETORNO"],["95200","MIRAFLORES"],["97001","MITÚ"],["97161","CARURÚ"],["97511","PACOA"],["97666","TARAIRA"],["97777","PAPUNAHUA"],["97889","YAVARATÉ"],["99001","PUERTO CARREÑO"],["99524","LA PRIMAVERA"],["99624","SANTA ROSALÍA"],["99773","CUMARIBO"]];
    this._DeptosXZona = Array();

    this._datos = null;
    this._datosFormateados = Array();

    this._myChart0 = null;
    this._myChart1 = null;
    this._myChart2 = null;
    this._vColores = Array();

    this._DatosTC = null;

    this._idGraficas = Array();
    this._ListaIndicadores = Array();
    this._ListaIndicadoresC = Array();
    this._AsoIndi = Array();

    this._NombresColumnas = Array();
    this._DatosTabla = Array();
    this._VisualDatos = Array();

    this._IdDepto1 = "8";
    this._IdMun1 = "-1";
    this._IdDepto2 = "-1";
    this._IdMun2 = "-1";

    this._NombreDepto1 = "";
    this._NombreDepto2 = "";
    this._NombreMun1 = "";
    this._NombreMun2 = "";

    this._SimboloDecimal = ",";
    this._SimboloMiles = ".";
    this._SimboloMillones = "'";


    this.setearDatos = function(cadena){
        var arreglo = cadena.split(",");
        let vDummy = arreglo[0] == "0" ? "-1": arreglo[0];         
        this._IdDepto1 = Number(vDummy).toString();
        
        vDummy = arreglo[1] == "0" ? "-1": arreglo[1];         
        this._IdMun1 = Number(vDummy).toString();
        
        vDummy = arreglo[2] == "0" ? "-1": arreglo[2];         
        this._IdDepto2 = Number(vDummy).toString();

        vDummy = arreglo[3] == "0" ? "-1": arreglo[3];         
        this._IdMun2 = Number(vDummy).toString();

        this._NombreDepto1 = "";
        this._NombreDepto2 = "";
        this._NombreMun1 = "";
        this._NombreMun2 = "";

        if(this._IdDepto1 != -1){
            let vObj = Graficas._Deptos.find(item => item[0] === (this._IdDepto1+''));
            this._NombreDepto1 = vObj[1];
        }
        if(this._IdMun1 == -1){
            this._NombreMun1 = 'Todos los municipios';
        }
        else{
            let vObj = Graficas._Muni.find(item => item[0] === (this._IdMun1+''));
            this._NombreMun1 = vObj[1];
        }

        if(this._IdDepto2 != -1){
            let vObj = Graficas._Deptos.find(item => item[0] === (this._IdDepto2+''));
            this._NombreDepto2 = vObj[1];
            if(this._IdMun2 == -1){
                this._NombreMun2 = 'Todos los municipios';
            }
            else{
                let vObj = Graficas._Muni.find(item => item[0] === (this._IdMun2+''));
                this._NombreMun2 = vObj[1];
            }

        }

        

        Graficas.limpiarIndicadores();
    }

    

    this.cargar_datos = function(){

       
        Graficas._datos = [
            ["DEPARTAMENTO", "MUNICIPIO", "Seleccione Indicador"],            
          ];
          
          Graficas._ListaIndicadores = [
            ["PIB por habitante", "pibxhabitante", "F2",4],
            ["Actividades primarias", "actividades_primarias","F2",4],
            ["Actividades secundarias", "actividades_secundarias","F2",4],
            ["Actividades terciarias", "actividades_terciarias","F2",4],
            ["Pobreza Monetaria Extrema", "pobreza_monetaria_extrema","F1",3],
            ["Población Rural", "pobl_rur","F3",0],
            ["Población Urbano", "pobl_urb","F3",0],
            ["Población Total", "pobl_tot","F3",0],
            ["NBI", "nbi","F4",3],
            ["IPM", "IPM","F1",3],
            ["Índice de Cobertura de Energía Eléctrica en la Cabecera Municipal", "icee_cm","F4",3],
            ["Cobertura de Energía Eléctrica en el Resto", "icee_resto","F4",3],
            ["Índice de Cobertura de Energía Eléctrica Total", "icee_tot","F4",3],
            ["Posición nacional según desempeño integral", "DI_p_nal","F3",0],
            ["Índice de Desarrollo Municipal ", "indesarrollo_mun","F1",3],
            ["Cobertura efectiva de gas natural ", "cob_gres_efec","F4",3],
            ["Tasa de homicidios por cada 100.000 habitantes ", "homicidios_x_cada_100000_habitantes","F1",3],
            ["Población en condición de miseria", "poblacion_en_condicion_de_miseria","F4",3],
            ["Cobertura de acueducto ", "cobertura_de_acueducto","F4",3],
            ["Cobertura de alcantarillado", "cobertura_de_alcantarillado","F4",3],
          ];

          Graficas._ListaIndicadoresC = [
            ["Año de reporte de la base de datos", "anno_", "PRE","Año de reporte -","NA",0],
            ["Porcentaje en el municipio", "_pct" , "POS","Porcentaje en el municipio -","F4",3],
            ["Porcentaje en el departamento", "t_pct", "POS", "Porcentaje en el departamento - ","F4",3],
            ["Posición en el departamento", "rank_dep_", "PRE", "Posición en el departamento - ","F3",0],
            ["Posición en nacional", "rank_nac_", "PRE", "Posición nacional - ","F3",0],        
          ];

          Graficas._AsoIndi = [
            ["pibxhabitante",["anno_", "rank_nac"] ], 
            ["actividades_primarias",["anno_", "rank_dep_", "rank_nac_"] ], 
            ["actividades_secundarias",["anno_", "rank_dep_", "rank_nac_"] ], 
            ["actividades_terciarias",["anno_", "rank_dep_", "rank_nac_"] ], 
            ["pobreza_monetaria_extrema",["anno_", "rank_nac_"] ], 
            ["pobl_rur",["anno_", "rank_dep_", "rank_nac_","_pct","t_pct"] ], 
            //["pobl_urb",["anno_", "rank_dep", "rank_nac","_pct","t_pct"] ], 
            ["pobl_urb",["anno_", "rank_dep_", "rank_nac_","_pct"] ], 
            //["pobl_tot",["anno_", "rank_dep", "rank_nac","_pct","t_pct"] ], 
            ["pobl_tot",["anno_", "rank_dep_", "rank_nac_","t_pct"] ], 
            ["nbi",["anno_", "rank_dep_", "rank_nac_"] ], 
            ["IPM",["anno_", "rank_dep_", "rank_nac_"] ], 
            ["icee_cm",["anno_", "rank_dep_", "rank_nac_"] ], 
            ["icee_resto",["anno_", "rank_dep_", "rank_nac_"] ], 
            ["icee_tot",["anno_", "rank_dep_", "rank_nac_"] ], 
            //["DI_p_nal",["anno_", "rank_dep", "rank_nac"] ], 
            ["DI_p_nal",["anno_"] ], 
            ["indesarrollo_mun",["anno_", "rank_dep_", "rank_nac_"] ], 
            ["cob_gres_efec",["anno_", "rank_dep_", "rank_nac_"] ], 
            ["homicidios_x_cada_100000_habitantes",["anno_", "rank_dep_", "rank_nac_"] ], 
            ["poblacion_en_condicion_de_miseria",["anno_", "rank_dep_", "rank_nac_"] ], 
            ["cobertura_de_acueducto",["anno_", "rank_dep_", "rank_nac_"] ], 
            ["cobertura_de_alcantarillado",["anno_", "rank_dep_", "rank_nac_"] ], 
          ];
          
          Graficas.dibujar_lista_indicadores();
    };


    this.dibujar_lista_indicadores = function(){
        try{
            var vTabla = '';
            for (var i = 0; i < Graficas._ListaIndicadores.length; i++) {                
                var vFila = Graficas._ListaIndicadores[i];
                vTabla += " <tr '><td style='cursor: pointer;width: 5px;text-align: right;' ><span onclick=\"Graficas.verInf('"+vFila[1]+"')\">[+]</span></td><td class='txt_verde' style='vertical-align: middle;padding: 5px;border-bottom: 1px solid #ccc;' >"+vFila[0]+"</td><td style='text-align: center;padding: 5px;border-bottom: 1px solid #ccc;'><input class='components'  type='checkbox'  id='"+vFila[1]+"' name='"+vFila[1]+"' value='0'></td></tr>";

                vTabla += '<tr id="div_zoom_'+vFila[1]+'" style="font-size: 10px;display:none;"><td></td><td >';
                vTabla += '<span style="cursor: pointer;" onclick="Graficas.ocultar(\''+vFila[1]+'\')">[Cerrar]</span><br>';
                vTabla += '<b>Descripción: </b><span id="div_des_'+vFila[1]+'">xxx</span> <br>';
                vTabla += '<b>Definición: </b><span id="div_def_'+vFila[1]+'">xxx</span> <br>';
                vTabla += '<b>Observación: </b><span id="div_obs_'+vFila[1]+'">xxx</span> <br>';
                vTabla += '<b>Institución / Fuente: </b><span id="div_ins_'+vFila[1]+'">xxx</span> <br>';
                vTabla += '<b>Escala: </b><span id="div_esc_'+vFila[1]+'">xxx</span> <br>';
                vTabla += '</td><td></td></tr>';
            }
            $('#body_lista_indicadores').html(vTabla);

            var vTabla = '';
            for (var i = 0; i < Graficas._ListaIndicadoresC.length; i++) {                
                var vFila = Graficas._ListaIndicadoresC[i];
                vTabla += " <tr><td class='txt_verde' style='border-bottom: 1px solid #ccc;vertical-align: middle;padding: 5px;   ' >"+vFila[0]+" </td><td style='text-align: center;vertical-align: middle;padding: 5px;border-bottom: 1px solid #ccc;'><input class='components'  type='checkbox'  id='"+vFila[1]+"' name='"+vFila[1]+"' value='0'></td></tr>";
            }
            $('#body_lista_indicadoresC').html(vTabla);
        }
        catch (e) {
            Mensaje.excepcion(e.message);
            return false;
        }
    };


    this.verInf = function(pId){
        let objIndi = Mydata._infVariable.find(item => item[0] === pId);
        $('#div_des_'+pId).html(objIndi[1]);
        $('#div_def_'+pId).html(objIndi[2]);
        $('#div_obs_'+pId).html(objIndi[3]);
        $('#div_ins_'+pId).html(objIndi[4]);
        $('#div_esc_'+pId).html(objIndi[5]);
        $('#div_zoom_'+pId).show();
    };
    

    this.ocultar = function(pId){
        $('#div_zoom_'+pId).hide();
    };

    this.cambioCh = function(pId){
        var vIsCh = $('#g_' + pId).is(':checked');
        if(vIsCh){
            if(Graficas._idGraficas.length >= 3){
                alert('Ya ha marcado tres o más indicadores para graficar');
                $('#g_' + pId).prop('checked', false);
                return;                
            }
            else{
                Graficas._idGraficas.push(pId);    
                Graficas.graficar_lineas();    
            }
        }
        else{
            const index = Graficas._idGraficas.indexOf(pId); 
            if (index !== -1) {
                Graficas._idGraficas.splice(index, 1); // Si existe, lo elimina
                Graficas.graficar_lineas();
            }
        }

        //console.log(Graficas._idGraficas);
    }


    this.graficar_lineas = function(){
        try{
            //Ocultar todas la graficas
            $('#fil_myChart0').hide();
            $('#fil_myChart1').hide();
            $('#fil_myChart2').hide();
            var vLabels = Array();
            var vLabelsDS = Array();
            var vData0 = Array();
            var vData1 = Array();
            var vData2 = Array();

            for (var i = 0; i < Graficas._datos.length; i++) {                                
                var vFila = Graficas._datos[i];
                if(i !=0){
                    vLabels.push(vFila[0] + " / " + vFila[1]);
                }
                for(var j =0; j < Graficas._idGraficas.length;j++){
                    var vIdCol = Graficas._idGraficas[j];
                    if(i==0){
                        vLabelsDS.push(vFila[vIdCol]);
                    }
                    else{
                        switch (j){
                            case 0:{
                                vData0.push(General.toFloat(General.miReplaceAll('.', ',', vFila[vIdCol] + '')));
                            }break;
                            case 1:{
                                vData1.push(General.toFloat(General.miReplaceAll('.', ',', vFila[vIdCol] + '')));
                            }break;
                            case 2:{
                                vData2.push(General.toFloat(General.miReplaceAll('.', ',', vFila[vIdCol] + '')));
                            }break;
                        }
                    }
                }
                
            }

            
            
            if(vLabelsDS.length > 0){
                $('#fil_myChart0').show();
                const data0 = {
                    labels: vLabels,
                    datasets: [
                    {
                        label: vLabelsDS[0],
                        data: vData0,
                        borderColor: '#FF0000', //Utils.CHART_COLORS.red,
                        //backgroundColor: '#FF000', //Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
                        pointStyle: 'circle',
                        pointRadius: 10,
                        pointHoverRadius: 15
                    }
                    ]
                };

                const config0 = {
                    type: 'line',
                    data: data0,
                    options: {
                      responsive: true,                      
                    }
                  };

                const ctx0 = $('#myChart0');
                if (Graficas._myChart0) {
                    Graficas._myChart0.destroy();
                }
                Graficas._myChart0 = new Chart(ctx0, config0);
                

            }
            if(vLabelsDS.length > 1){
                $('#fil_myChart1').show();
                const data1 = {
                    labels: vLabels,
                    datasets: [
                    {
                        label: vLabelsDS[1],
                        data: vData1,
                        borderColor: '#FF0000', 
                        pointStyle: 'circle',
                        pointRadius: 10,
                        pointHoverRadius: 15
                    }
                    ]
                };

                const config1 = {
                    type: 'line',
                    data: data1,
                    options: {
                      responsive: true,                      
                    }
                  };

                const ctx1 = $('#myChart1');
                if (Graficas._myChart1) {
                    Graficas._myChart1.destroy();
                }
                Graficas._myChart1 = new Chart(ctx1, config1);
            }

            if(vLabelsDS.length > 2){
                $('#fil_myChart2').show();
                const data2 = {
                    labels: vLabels,
                    datasets: [
                    {
                        label: vLabelsDS[2],
                        data: vData2,
                        borderColor: '#FF0000', 
                        pointStyle: 'circle',
                        pointRadius: 10,
                        pointHoverRadius: 15
                    }
                    ]
                };

                const config2 = {
                    type: 'line',
                    data: data2,
                    options: {
                      responsive: true,                      
                    }
                  };

                const ctx2 = $('#myChart2');
                if (Graficas._myChart2) {
                    Graficas._myChart2.destroy();
                }
                Graficas._myChart2 = new Chart(ctx2, config2);
            }



        }
        catch (e) {
            Mensaje.excepcion(e.message);
            return false;
        }
    };
    


    this.mostrarTabla = function(){
        try{

            //Graficas.cargar_datos();
            var vEnc = '';
            var vFilas = '';
            var vCh = '';
            var vLargo = 0;
            
            

            for (var i = 0; i < Graficas._datosFormateados.length; i++) {
                
                var vItem = Graficas._datosFormateados[i];
                if(i == 0){
                    vEnc += '	<tr>';
                    vCh += '	<tr style="text-align:center">';
                    vLargo = vItem.length;
                    for (var j = 0; j < vItem.length; j++) {
                        var vValor = vItem[j];
                        vEnc += '<td class="header" style="border: 1px solid #CCCCCC;vertical-align: middle;padding: 5px;"><b>'+vValor+'</b></td>';
                        if(j>1){
                            vCh += '<td stye="border: 1px solid #CCCCCC;vertical-align: middle;padding: 5px;"><input class="components"  type="checkbox"  id="g_'+j+'" name="g_'+j+'" value="0" onclick="Graficas.cambioCh('+j+')"></td>';
                        }
                    }
                    vEnc += '	</tr>';
                    vCh += '	</tr>';
                }
                else{
                    vFilas += '	<tr style="text-align:center">';
                    for (var j = 0; j < vItem.length; j++) {
                        var vValor = vItem[j];
                        vFilas += '<td style=" '+((j==0 || j == 1)?' text-align:left; ':'')+' border: 1px solid #CCCCCC !important ;vertical-align: middle;padding: 5px;">'+vValor+'</td>';
                    }
                    vFilas += '	</tr>';
                }
                vTabla += '<option value="' + vItem.Valor + '"  >' + vItem.Nombre + '</option>';
            }

            
            var vTabla = '';
            vTabla += '<table id="TablaIndicadores" style="width: 100%; border-collapse: collapse font-size: 10px;">';
            
            
            vTabla += '<thead>';                               
            vTabla += '	<tr>  ';
            //vTabla += '		<td rowspan="2" colspan="2">&nbsp;</td>';   
            vTabla += '		<td rowspan="2" colspan="2" style="text-align: center;">';   
            vTabla += '<img src="Content/excel.JPG" width="45" border="0" height="45" style="cursor: pointer;" onclick="Graficas.Exportar();" >                   ';
            /*vTabla += '<button type="button" class="btn btn-success" onclick="General.ExportarExcel(\'TablaIndicadores\', \'Indicadores\')">';
            vTabla += '	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-excel-fill" viewBox="0 0 16 16">';
            vTabla += '		<path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM5.884 6.68 8 9.219l2.116-2.54a.5.5 0 1 1 .768.641L8.651 10l2.233 2.68a.5.5 0 0 1-.768.64L8 10.781l-2.116 2.54a.5.5 0 0 1-.768-.641L7.349 10 5.116 7.32a.5.5 0 1 1 .768-.64z" />';
            vTabla += '	</svg>';
            vTabla += '	Exportar';
            vTabla += '</button>';
            */
            vTabla += '		</td>';  
            vTabla += '		<td colspan="'+(vLargo-2)+'" style="background-color: #f97316; text-align: center; border-top-left-radius: 12px; padding: 8px; color: white;border-top-right-radius: 12px; padding: 8px; " ><b>¿QUÉ DESEA GRAFICAR? (Máximo tres gráficas) </b></td>';
            vTabla += '	</tr>  ';
            vTabla+= vCh ;
            vTabla+= vEnc ;
            vTabla+= vFilas ;
            
            if(Graficas._datosFormateados.length != 0){
                let vTxt = Graficas._NombreDepto1 +" / " + Graficas._NombreMun1;
                if(Graficas._NombreMun2 != ""){
                    vTxt += ' Comprado con: ' + Graficas._NombreDepto2 + " / " + Graficas._NombreMun2;
                }                 
                vTabla += '<tr><td colspan="'+(vLargo+2)+'" >Fecha de Reporte: '+obtenerFechaHora()+'</td></tr>';
                vTabla += '<tr><td colspan="'+(vLargo+2)+'" >Selección Filtros: '+vTxt+'</td></tr>';
                vTabla += '<tr><td colspan="'+(vLargo+2)+'" >Fuente: Ministerio de Minas y Energía MME</td></tr>';
            }
                

            vTabla += '</table>';
            $('#div_tablaData').html(vTabla);
        } 
        catch (e) {
            Mensaje.excepcion(e.message);
            return false;
        }
    };


    this.consultar_datos = function(){
        try{
            let seleccionados = [];
            let seleccionadosC = [];

            let camposTabla = [];
            Graficas._NombresColumnas = Array();
            Graficas._VisualDatos = Array();

            //LLenar los campos seleccionados
            $("#body_lista_indicadores input[type=checkbox]:checked").each(function () {
                seleccionados.push(this.id);
            });
            //Llenar los compuestos seleccionados
            $("#body_lista_indicadoresC input[type=checkbox]:checked").each(function () {
                seleccionadosC.push(this.id);
            });

            //Si ha seleccionado alguno poner de primero departamento y municipio
            if(seleccionados.length != 0){
                Graficas._NombresColumnas.push("DEPARTAMENTO");
                Graficas._NombresColumnas.push("MUNICIPIO");
            }

            //console.log(seleccionados);
            //console.log(seleccionadosC);

            for (var i = 0; i < seleccionados.length; i++) {
                //campo a campo seleccionados
                let itemCampo = seleccionados[i] ;
                //Inlcuir el campo seleccionado
                camposTabla.push(itemCampo);

                //Buscar la columna seleccionada para poner el resto de atributos
                let objIndi = Graficas._ListaIndicadores.find(item => item[1] === itemCampo);
                let nombre_columna = objIndi[0];
                Graficas._NombresColumnas.push(nombre_columna);
                //Incluir la funcion y numeros significativos
                Graficas._VisualDatos.push([objIndi[2],objIndi[3]]);
                //Sacar los compuestos asociados
                let elemento = Graficas._AsoIndi.find(item => item[0] === itemCampo);
                for (var j = 0; j < seleccionadosC.length; j++) {
                    let itemCampoC = seleccionadosC[j] ;                    
                    let vTieneProp =  elemento ? elemento[1].includes(itemCampoC) : false;
                    //Si tiene la propiedad
                    if(vTieneProp){                        
                        let indC = Graficas._ListaIndicadoresC.find(item => item[1] === itemCampoC);

                        let vCampoCompuesto = (indC[2] == "PRE"? itemCampoC :"" )+  itemCampo + (indC[2] == "POS"? itemCampoC :"" );
                        camposTabla.push(vCampoCompuesto);

                        let objIndi = Graficas._ListaIndicadoresC.find(item => item[1] === itemCampoC);
                        //let nombreCompu = (indC[2] == "PRE"? objIndi[3] :"" )+  nombre_columna + (indC[2] == "POS"? objIndi[3] :"" );
                        let nombreCompu =    objIndi[3]  + nombre_columna ;
                        //LLenar el nombre del campo compuesto    
                        Graficas._NombresColumnas.push(nombreCompu);
                        Graficas._VisualDatos.push([objIndi[4],objIndi[5]]);

                        
                    }

                }
            }

            

            

            //console.log(seleccionados);
            //console.log(seleccionadosC);
            //console.log(camposTabla);
            //console.log(Graficas._VisualDatos);
            //console.log(Graficas._NombresColumnas);

            Graficas._DatosTabla = camposTabla;

            Graficas.respuesta_consulta();
            
        }
        catch (e) {
            Mensaje.excepcion(e.message);
            return false;
        }
    };

    this.limpiarIndicadores = function () {
        $("#offcanvas input[type='checkbox']").prop("checked", false);
        Graficas._datos = Array();
        Graficas._DatosTabla = Array();
        Graficas._idGraficas = Array();
        Graficas._datosFormateados = Array();
        Graficas.mostrarTabla();
        Graficas.graficar_lineas();    
        
    };



    this.respuesta_consulta = function(){
        try{

            if(Graficas._NombresColumnas.length == 0){
                return;
            }

            if(Graficas._IdDepto1 == "-1"){
                return;
            }

            //console.log(Graficas._DatosTabla);

            //Determinar los indices de las columnas de los datos seleccionados    
            let vIndicesColumnas = Array();
            for (var j = 0; j < Graficas._DatosTabla.length; j++) {                
                const indice = Mydata.Titulos.indexOf(Graficas._DatosTabla[j]);                
                if(indice != -1){
                    vIndicesColumnas.push(indice);
                }
            }

            let resultados = Array();
            //Busqueda por el primer departamento
            //buscar si todos los deptarmentos
            if(Graficas._IdMun1 == "-1"){
                resultados = Mydata.data.filter(fila => fila[0] === Graficas._IdDepto1);
            }
            else{
                resultados = Mydata.data.filter(fila => fila[2] === Graficas._IdMun1);
            }

            //por el segundo departamento
            if(Graficas._IdDepto2 != "-1"){
                if(Graficas._IdMun2 == "-1"){
                    resultados = resultados.concat( Mydata.data.filter(fila => fila[0] === Graficas._IdDepto2));
                }
                else{
                    resultados = resultados.concat(Mydata.data.filter(fila => fila[2] === Graficas._IdMun2));
                }
            }

            let vDep1 = Graficas._Deptos.filter(fila => fila[0] === 5);

            //console.log(resultados);
            //console.log(vIndicesColumnas);
            Graficas._datos = Array();
            Graficas._datosFormateados = Array();
            Graficas._datos.push(Graficas._NombresColumnas);
            Graficas._datosFormateados.push(Graficas._NombresColumnas);

            for (var j = 0; j < resultados.length; j++) {
                //console.log(Graficas._NombresColumnas);
                //console.log(Graficas._VisualDatos);
                let vFila = resultados[j];
                let Fila = Array();
                let FilaF = Array();
                //Pone el nombre del departamento
                Fila.push(vFila[1]);
                FilaF.push(vFila[1]);
                //Pone el nombre del municipio
                Fila.push(vFila[3]);
                FilaF.push(vFila[3]);
                for (var i = 0; i < vIndicesColumnas.length; i++) {
                    var vValorOriginal = vFila[vIndicesColumnas[i]];                    
                    Fila.push(vValorOriginal);
                    //console.log(vFila[vIndicesColumnas[i]]);
                    //Formatear
                    var vFuncion = Graficas._VisualDatos[i][0];
                    var vCifras = Graficas._VisualDatos[i][1];
                    var vValorFormateado = vValorOriginal;
                    switch (vFuncion){
                        case "F1":{
                            vValorFormateado = F1_formatearNumeroCifrasSignificativas(vValorOriginal, Graficas._SimboloDecimal,  Graficas._SimboloMiles, vCifras);
                        }break;
                        case "F2":{                            
                            vValorFormateado = F2_formatearNumeroCifrasSignificativasEnMillones(vValorOriginal, Graficas._SimboloDecimal,  Graficas._SimboloMiles, vCifras);                            
                        }break;
                        case "F3":{
                            vValorFormateado = F3_formatearEnteroConSeparadores(vValorOriginal, Graficas._SimboloDecimal,  Graficas._SimboloMiles, Graficas._SimboloMillones);
                        }break;
                        case "F4":{
                            vValorFormateado = F4_formatearNumeroCifrasSignificativasEnPorcentaje(vValorOriginal, Graficas._SimboloDecimal,  Graficas._SimboloMiles, vCifras);
                        }break;

                    }

                    FilaF.push(vValorFormateado);
                }

                Graficas._datos.push(Fila);
                Graficas._datosFormateados.push(FilaF);
            }
            //console.log(Graficas._datosFormateados);


/*
            alert('Ok');


            Graficas._datos = Array();
            Graficas._datos.push(Graficas._NombresColumnas);
            
            if(Graficas._NombresColumnas.length != 0){
                for (let i = 0; i <= 10; i++){
                    let Fila = Array();
                    Fila.push("Departamento " + i);
                    Fila.push("Municipio " + i);
                    for (let j = 0; j <= Graficas._NombresColumnas.length -3 ; j++){
                        Fila.push(Math.floor(Math.random() * 200) + 1);
                    }
                    Graficas._datos.push(Fila);
                }
            }
                    */               
            Graficas.mostrarTabla();
            Graficas._idGraficas = Array();
            Graficas.graficar_lineas();    
            
        }
        catch (e) {
            Mensaje.excepcion(e.message);
            return false;
        }
    };

    this.Exportar = function(){
        if(Graficas._DatosTabla.length == 0){
            alert('No hay indicadores seleccionados para visualizar y exportar');
            return;
        }  

        const tablaOriginal = document.getElementById("TablaIndicadores");
        const tablaClonada = tablaOriginal.cloneNode(true);

        // Eliminamos las dos primeras filas
        tablaClonada.deleteRow(0); // fila 0
        tablaClonada.deleteRow(0); // la fila 1 original ahora es la 0 tras eliminar

         // 2. Convertimos a worksheet
        const ws = XLSX.utils.table_to_sheet(tablaClonada);

        // 3. Aplicamos negrita a la primera columna
        const rango = XLSX.utils.decode_range(ws['!ref']);
        for (let row = rango.s.r; row <= rango.e.r; row++) {
            const cellAddress = { r: row, c: 0 }; // columna A (índice 0)
            const cellRef = XLSX.utils.encode_cell(cellAddress);
            if (ws[cellRef]) {
            ws[cellRef].s = {
                font: { bold: true }
            };
            }
        }

        // 4. Creamos libro y añadimos hoja
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "TablaIndicadores");

        // Descargamos el archivo
        XLSX.writeFile(wb, "TablaIndicadores.xlsx", { cellStyles: true });
        
    }
};