#calcula a distribuicao dos grupos
aps_tobe <- read.csv("~/mba/tcc/rodada_final/ceps_copa_botafogo_aps_para_clusterizar_agrupado.csv")
totais_grupos_tobe <- c(nrow(aps_tobe[aps_tobe$grupo==0,]), nrow(aps_tobe[aps_tobe$grupo==1,]),nrow(aps_tobe[aps_tobe$grupo==2,]), nrow(aps_tobe[aps_tobe$grupo==3,]))

#imprime o numero de elementos no primeiro grupo e calcula o desvio padrao dos grupos
nrow(aps_tobe[aps_tobe$grupo==0,])
sd(totais_grupos_tobe)

aps_asis <- read.csv("~/mba/tcc/rodada_final/ceps_copa_botafogo_aps_centroids_comformula.csv")

totais_grupos_asis <- c(nrow(aps_tobe[aps_asis$aps_norm==0,]), nrow(aps_asis[aps_tobe$aps_norm==1,]),nrow(aps_asis[aps_tobe$aps_norm==2,]), nrow(aps_asis[aps_tobe$aps_norm==3,]))

#imprime o numero de elementos no primeiro grupo e calcula o desvio padrao dos grupos
nrow(aps_asis[aps_asis$aps_norm==0,])
sd(totais_grupos_asis)
