library(plyr)

#mescla arquivos com coordenadas e aps utilizando o CEP
ceps_aps <- read.csv("~/mba/tcc/rodada_final/ceps_copa_botafogo_aps.csv")
ceps_coordenadas <- read.csv("~/mba/tcc/rodada_final/ceps_copa_botafogo_coordenadas.csv")
ceps_coordenadas_aps <- join(ceps_aps, ceps_coordenadas, by=c("cep"))
write.csv(ceps_coordenadas_aps, file = "~/mba/tcc/rodada_final/ceps_copa_botafogo_aps_para_clusterizar.csv")
