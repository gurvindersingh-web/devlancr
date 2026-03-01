package com.devlancr.service;

import com.devlancr.dto.request.MessageRequest;
import com.devlancr.entity.*;
import com.devlancr.entity.enums.NotificationType;
import com.devlancr.exception.*;
import com.devlancr.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final ContractRepository contractRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    @Transactional
    public Message sendMessage(String email, MessageRequest request) {
        User sender = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Contract contract = contractRepository.findById(request.getContractId())
                .orElseThrow(() -> new ResourceNotFoundException("Contract not found"));

        Long clientUserId = contract.getClient().getUser().getId();
        Long freelancerUserId = contract.getFreelancer().getUser().getId();

        if (!sender.getId().equals(clientUserId) && !sender.getId().equals(freelancerUserId)) {
            throw new UnauthorizedException("Not authorized to send messages in this contract");
        }

        Message message = Message.builder()
                .contract(contract)
                .sender(sender)
                .content(request.getContent())
                .build();

        message = messageRepository.save(message);

        Long recipientId = sender.getId().equals(clientUserId) ? freelancerUserId : clientUserId;
        notificationService.createNotification(
                recipientId, "New Message",
                sender.getFirstName() + " sent you a message",
                NotificationType.MESSAGE_RECEIVED, contract.getId());

        return message;
    }

    public List<Message> getContractMessages(Long contractId, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Contract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new ResourceNotFoundException("Contract not found"));

        Long clientUserId = contract.getClient().getUser().getId();
        Long freelancerUserId = contract.getFreelancer().getUser().getId();

        if (!user.getId().equals(clientUserId) && !user.getId().equals(freelancerUserId)) {
            throw new UnauthorizedException("Not authorized to view messages");
        }

        return messageRepository.findByContractIdOrderByCreatedAtAsc(contractId);
    }
}
