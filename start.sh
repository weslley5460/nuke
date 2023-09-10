#!/bin/bash
while true; do
clear
echo " ${PURALIZINE}"
node index.js 
if [[ $? -eq 0 ]]; then
echo "Script Concluído Com Sucesso."
else
echo "Houve Um Erro Ao Executar O Script."
fi
done
