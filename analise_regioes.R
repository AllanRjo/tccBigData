library(plyr)

#mescla arquivos com coordenadas e aps utilizando o CEP
ceps_aps <- read.csv("~/mba/tcc/rodada_final/ceps_copa_botafogo_aps.csv")
ceps_coordenadas <- read.csv("~/mba/tcc/rodada_final/ceps_copa_botafogo_coordenadas.csv")
ceps_aps_coordenadas <- join(ceps_aps, ceps_coordenadas, by=c("cep"))
write.csv(ceps_coordenadas_aps, file = "~/mba/tcc/rodada_final/ceps_copa_botafogo_aps_para_clusterizar.csv")


#contribuintes_municipios <- merge(contribuintes,municipios, by.x="id_muni_ibge", by.y="id_muni_ibge", x=TRUE)
ceps_coordenadas_aps <- join(ceps_coordenadas, agencias_copa_bota, by="aps")
View(ceps_coordenadas_aps)

write.csv(ceps_coordenadas_aps, file = "~/mba/tcc/ceps_copa_botafogo_aps_para_clusterizar.csv")

#calcula a distribuicao dos grupos
agencias_ceps_agrupados <- read.csv("~/mba/tcc/ceps_copa_botafogo_aps_para_clusterizar_agrupado.csv")
nrow(agencias_ceps_agrupados[agencias_ceps_agrupados$grupo==2,])


g1 <- read.csv("~/mba/tcc/ceps_copa_botafogo_aps_para_clusterizar.csv", header=TRUE)
g2 <- read.csv("~/mba/tcc/ceps_copa_botafogo_aps_para_clusterizar_agrupado.csv", header=TRUE)
g3 <- join(g1, g2, by=c("Latitude", "Longitude"))
View(g3)
write.csv(g3, file = "~/mba/tcc/ceps_copa_botafogo_aps_centroids.csv")
